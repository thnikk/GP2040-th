import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useProfilesStore from '../Store/useProfilesStore';
import WebApi from '../Services/WebApi';
import { DisplayEmulator } from '../display/emulator';
import { BOARD_LAYOUTS } from '../display/boardLayouts';
import {
	DisplayOptions,
	GamepadInput,
	GamepadOptions,
	ScreenConfig,
} from '../display/types';

const BUTTON_ACTION_MASKS: Record<number, number> = {
	5: 1 << 0, // B1
	6: 1 << 1, // B2
	7: 1 << 2, // B3
	8: 1 << 3, // B4
	9: 1 << 4, // L1
	10: 1 << 5, // R1
	11: 1 << 6, // L2
	12: 1 << 7, // R2
	13: 1 << 8, // S1
	14: 1 << 9, // S2
	15: 1 << 12, // A1
	16: 1 << 13, // A2
	17: 1 << 10, // L3
	18: 1 << 11, // R3
	41: 1 << 14, // A3
	42: 1 << 15, // A4
	43: 1 << 20, // E1
	44: 1 << 21, // E2
	45: 1 << 22, // E3
	46: 1 << 23, // E4
	47: 1 << 24, // E5
	48: 1 << 25, // E6
	49: 1 << 26, // E7
	50: 1 << 27, // E8
	51: 1 << 28, // E9
	52: 1 << 29, // E10
	53: 1 << 30, // E11
	54: 1 << 31, // E12
};

const DPAD_ACTION_MASKS: Record<number, number> = {
	1: 1 << 0, // UP
	2: 1 << 1, // DOWN
	3: 1 << 2, // LEFT
	4: 1 << 3, // RIGHT
};

const MACRO_ACTIONS = new Set([33, 34, 35, 36, 37, 38, 39]);

type PinData = {
	action?: number;
	customButtonMask?: number;
	customDpadMask?: number;
};

function getPinData(
	profile: Record<string, unknown> | undefined,
	pin: number,
): PinData | undefined {
	const key = `pin${String(pin).padStart(2, '0')}`;
	return profile?.[key] as PinData | undefined;
}

function computeInput(
	heldPins: number[],
	profile: Record<string, unknown> | undefined,
	activeDpadMode: number,
): GamepadInput {
	let buttons = 0;
	let dpad = 0;
	for (const pin of heldPins) {
		const data = getPinData(profile, pin);
		if (!data) continue;
		const action = data.action;
		if (action === undefined) continue;
		let btnMask = BUTTON_ACTION_MASKS[action];
		let dpadMask = DPAD_ACTION_MASKS[action];
		if (btnMask !== undefined && data.customButtonMask) {
			btnMask = data.customButtonMask;
		}
		if (dpadMask !== undefined && data.customDpadMask) {
			dpadMask = data.customDpadMask;
		}
		if (btnMask !== undefined) buttons |= btnMask;
		if (dpadMask !== undefined) dpad |= dpadMask;
	}
	return { buttons, dpad, activeDpadMode, heldPins };
}

export type DisplayEmulatorHandle = {
	ready: boolean;
	renderFrame: (nowMs: number) => void;
	getCanvas: () => HTMLCanvasElement | null;
};

export function useDisplayEmulator({
	heldPins,
	profileIndex,
	enabled,
}: {
	heldPins: number[];
	profileIndex: number;
	enabled: boolean;
}): DisplayEmulatorHandle | null {
	const [ready, setReady] = useState(false);
	const [displayOptions, setDisplayOptions] = useState<DisplayOptions | null>(
		null,
	);
	const [gamepadOptions, setGamepadOptions] = useState<GamepadOptions | null>(
		null,
	);

	const emulatorRef = useRef<DisplayEmulator | null>(null);
	if (emulatorRef.current === null) {
		emulatorRef.current = new DisplayEmulator();
	}

	const heldPinsRef = useRef(heldPins);
	heldPinsRef.current = heldPins;

	const profile = useProfilesStore((state) => state.profiles[profileIndex]);
	const profileRef = useRef<Record<string, unknown> | undefined>(profile);
	profileRef.current = profile as Record<string, unknown>;

	const dpadModeRef = useRef(0);
	dpadModeRef.current = gamepadOptions?.dpadMode ?? 0;

	const boardId = (import.meta.env.VITE_GP2040_BOARD || '').toLowerCase();
	const bundledLayout = BOARD_LAYOUTS[boardId];

	const [boardLayout, setBoardLayout] = useState<{
		layoutA?: unknown[];
		layoutB?: unknown[];
	} | null>(null);

	useEffect(() => {
		if (!enabled) {
			setReady(false);
			return;
		}
		let cancelled = false;
		async function fetchOptions() {
			const [display, gamepad] = await Promise.all([
				WebApi.getDisplayOptions(),
				WebApi.getGamepadOptions(() => {}),
			]);
			if (cancelled) return;
			setDisplayOptions(display ?? null);
			setGamepadOptions(gamepad ?? null);
		}
		fetchOptions();
		if (import.meta.env.DEV) {
			WebApi.getBoardLayout().then((layout) => {
				if (!cancelled && layout) setBoardLayout(layout);
			});
		}
		return () => {
			cancelled = true;
		};
	}, [enabled]);

	const screenConfig = useMemo<ScreenConfig | null>(() => {
		if (!displayOptions || !gamepadOptions || !profile) return null;
		const pinActions: number[] = [];
		let macroEnabled = false;
		for (let i = 0; i < 30; i++) {
			const action =
				getPinData(profile as Record<string, unknown>, i)?.action ?? -10;
			pinActions[i] = action;
			if (MACRO_ACTIONS.has(action)) macroEnabled = true;
		}
		return {
			displayOptions,
			gamepadOptions,
			buttonLayout: displayOptions.buttonLayout ?? 0,
			buttonLayoutRight: displayOptions.buttonLayoutRight ?? 0,
			profileNumber: profileIndex,
			profileLabel: profile.profileLabel ?? '',
			macroEnabled,
			pinActions,
			keyboardKeycodes: profile.keyboardKeycodes ?? [],
			keyboardModifierMasks: profile.keyboardModifierMasks ?? [],
			boardLayoutA:
				(boardLayout?.layoutA as ScreenConfig['boardLayoutA'] | undefined)?.length
					? (boardLayout.layoutA as ScreenConfig['boardLayoutA'])
					: bundledLayout?.layoutA,
			boardLayoutB:
				(boardLayout?.layoutB as ScreenConfig['boardLayoutB'] | undefined)?.length
					? (boardLayout.layoutB as ScreenConfig['boardLayoutB'])
					: bundledLayout?.layoutB,
		};
	}, [displayOptions, gamepadOptions, profile, profileIndex, boardLayout, bundledLayout]);

	useEffect(() => {
		const emulator = emulatorRef.current;
		if (!emulator) return;
		if (!screenConfig) {
			setReady(false);
			return;
		}
		emulator.invert = !!displayOptions?.invertDisplay;
		emulator.setConfig(screenConfig);
		setReady(true);
	}, [screenConfig, displayOptions]);

	const renderFrame = useCallback((nowMs: number) => {
		const emulator = emulatorRef.current;
		if (!emulator) return;
		const input = computeInput(
			heldPinsRef.current,
			profileRef.current,
			dpadModeRef.current,
		);
		emulator.render(input, nowMs);
	}, []);

	const getCanvas = useCallback(() => {
		return emulatorRef.current?.getDisplayCanvas() ?? null;
	}, []);

	return useMemo<DisplayEmulatorHandle | null>(() => {
		if (!enabled || !ready) return null;
		return { ready, renderFrame, getCanvas };
	}, [enabled, ready, renderFrame, getCanvas]);
}
