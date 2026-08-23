import { GFX } from './gfx';
import {
	GPButtonLayout,
	GPViewport,
	GamepadInput,
	ScreenConfig,
	GAMEPAD_MASK,
	INPUT_MODE,
	DPAD_MODE,
	SOCD_MODE,
	SCREEN_WIDTH,
} from './types';
import { drawWidget } from './widgets';
import { getLayoutA, getLayoutB } from './layouts';

const INPUT_HISTORY_MAX_INPUTS = 22;

// Special glyph characters (mirror GPGFX_core.h)
const CHAR_TRIANGLE = '\u0080';
const CHAR_CIRCLE = '\u0081';
const CHAR_CROSS = '\u0082';
const CHAR_SQUARE = '\u0083';
const CHAR_UP = '\u0084';
const CHAR_DOWN = '\u0085';
const CHAR_LEFT = '\u0086';
const CHAR_RIGHT = '\u0087';
const CHAR_UL = '\u0088';
const CHAR_UR = '\u0089';
const CHAR_DL = '\u008A';
const CHAR_DR = '\u008B';
const CHAR_CAP_S = '\u008C';
const CHAR_HOME_S = '\u008D';
const CHAR_VIEW_X = '\u008E';
const CHAR_MENU_X = '\u008F';
const CHAR_HOME_X = '\u0090';
const CHAR_TPAD_P = '\u0091';
const CHAR_HOME_P = '\u0092';
const CHAR_SHARE_P = '\u0093';

const DISPLAY_NAMES: string[][] = [
	// HID / DINPUT
	[
		CHAR_UP,
		CHAR_DOWN,
		CHAR_LEFT,
		CHAR_RIGHT,
		CHAR_UL,
		CHAR_UR,
		CHAR_DL,
		CHAR_DR,
		CHAR_CROSS,
		CHAR_CIRCLE,
		CHAR_SQUARE,
		CHAR_TRIANGLE,
		'L1',
		'R1',
		'L2',
		'R2',
		'SL',
		'ST',
		'L3',
		'R3',
		'PS',
		'A2',
	],
	// Switch
	[
		CHAR_UP,
		CHAR_DOWN,
		CHAR_LEFT,
		CHAR_RIGHT,
		CHAR_UL,
		CHAR_UR,
		CHAR_DL,
		CHAR_DR,
		'B',
		'A',
		'Y',
		'X',
		'L',
		'R',
		'ZL',
		'ZR',
		'-',
		'+',
		'LS',
		'RS',
		CHAR_HOME_S,
		CHAR_CAP_S,
	],
	// XInput
	[
		CHAR_UP,
		CHAR_DOWN,
		CHAR_LEFT,
		CHAR_RIGHT,
		CHAR_UL,
		CHAR_UR,
		CHAR_DL,
		CHAR_DR,
		'A',
		'B',
		'X',
		'Y',
		'LB',
		'RB',
		'LT',
		'RT',
		CHAR_VIEW_X,
		CHAR_MENU_X,
		'LS',
		'RS',
		CHAR_HOME_X,
		'A2',
	],
	// Keyboard / HID-KB
	[
		CHAR_UP,
		CHAR_DOWN,
		CHAR_LEFT,
		CHAR_RIGHT,
		CHAR_UL,
		CHAR_UR,
		CHAR_DL,
		CHAR_DR,
		'B1',
		'B2',
		'B3',
		'B4',
		'L1',
		'R1',
		'L2',
		'R2',
		'S1',
		'S2',
		'L3',
		'R3',
		'A1',
		'A2',
	],
	// PS4
	[
		CHAR_UP,
		CHAR_DOWN,
		CHAR_LEFT,
		CHAR_RIGHT,
		CHAR_UL,
		CHAR_UR,
		CHAR_DL,
		CHAR_DR,
		CHAR_CROSS,
		CHAR_CIRCLE,
		CHAR_SQUARE,
		CHAR_TRIANGLE,
		'L1',
		'R1',
		'L2',
		'R2',
		CHAR_SHARE_P,
		'OP',
		'L3',
		'R3',
		CHAR_HOME_P,
		CHAR_TPAD_P,
	],
	// GEN/MD Mini
	[
		CHAR_UP,
		CHAR_DOWN,
		CHAR_LEFT,
		CHAR_RIGHT,
		CHAR_UL,
		CHAR_UR,
		CHAR_DL,
		CHAR_DR,
		'A',
		'B',
		'X',
		'Y',
		'',
		'Z',
		'',
		'C',
		'M',
		'S',
		'',
		'',
		'',
		'',
	],
	// Neo Geo Mini
	[
		CHAR_UP,
		CHAR_DOWN,
		CHAR_LEFT,
		CHAR_RIGHT,
		CHAR_UL,
		CHAR_UR,
		CHAR_DL,
		CHAR_DR,
		'B',
		'D',
		'A',
		'C',
		'',
		'',
		'',
		'',
		'SE',
		'ST',
		'',
		'',
		'',
		'',
	],
	// PC Engine/TG16 Mini
	[
		CHAR_UP,
		CHAR_DOWN,
		CHAR_LEFT,
		CHAR_RIGHT,
		CHAR_UL,
		CHAR_UR,
		CHAR_DL,
		CHAR_DR,
		'I',
		'II',
		'',
		'',
		'',
		'',
		'',
		'',
		'SE',
		'RUN',
		'',
		'',
		'',
		'',
	],
	// Egret II Mini
	[
		CHAR_UP,
		CHAR_DOWN,
		CHAR_LEFT,
		CHAR_RIGHT,
		CHAR_UL,
		CHAR_UR,
		CHAR_DL,
		CHAR_DR,
		'A',
		'B',
		'C',
		'D',
		'',
		'E',
		'',
		'F',
		'CRD',
		'ST',
		'',
		'',
		'MN',
		'',
	],
	// Astro City Mini
	[
		CHAR_UP,
		CHAR_DOWN,
		CHAR_LEFT,
		CHAR_RIGHT,
		CHAR_UL,
		CHAR_UR,
		CHAR_DL,
		CHAR_DR,
		'A',
		'B',
		'D',
		'E',
		'',
		'C',
		'',
		'F',
		'CRD',
		'ST',
		'',
		'',
		'',
		'',
	],
	// Original Xbox
	[
		CHAR_UP,
		CHAR_DOWN,
		CHAR_LEFT,
		CHAR_RIGHT,
		CHAR_UL,
		CHAR_UR,
		CHAR_DL,
		CHAR_DR,
		'A',
		'B',
		'X',
		'Y',
		'BL',
		'WH',
		'L',
		'R',
		'BK',
		'ST',
		'LS',
		'RS',
		'',
		'',
	],
];

const DISPLAY_MODE_LOOKUP: Record<number, number> = {
	[INPUT_MODE.PS3]: 0,
	[INPUT_MODE.GENERIC]: 0,
	[INPUT_MODE.SWITCH]: 1,
	[INPUT_MODE.SWITCH_PRO]: 1,
	[INPUT_MODE.XINPUT]: 2,
	[INPUT_MODE.XBONE]: 2,
	[INPUT_MODE.KEYBOARD]: 3,
	[INPUT_MODE.CONFIG]: 3,
	[INPUT_MODE.PS4]: 4,
	[INPUT_MODE.PSCLASSIC]: 4,
	[INPUT_MODE.MDMINI]: 5,
	[INPUT_MODE.NEOGEO]: 6,
	[INPUT_MODE.PCEMINI]: 7,
	[INPUT_MODE.EGRET]: 8,
	[INPUT_MODE.ASTRO]: 9,
	[INPUT_MODE.XBOXORIGINAL]: 10,
};

const IDX_ACTION = [
	1, 2, 3, 4, -5, -5, -5, -5, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 17, 18, 15, 16,
];

function keycodeToName(code: number): string {
	if (code === 0x00) return '';
	if (code >= 0x04 && code <= 0x1d)
		return String.fromCharCode('A'.charCodeAt(0) + (code - 0x04));
	if (code >= 0x1e && code <= 0x26)
		return String.fromCharCode('1'.charCodeAt(0) + (code - 0x1e));
	if (code === 0x27) return '0';
	switch (code) {
		case 0x28:
			return 'Ent';
		case 0x29:
			return 'Esc';
		case 0x2a:
			return 'Bsp';
		case 0x2b:
			return 'Tab';
		case 0x2c:
			return 'Spc';
		case 0x2d:
			return '-';
		case 0x2e:
			return '=';
		case 0x2f:
			return '[';
		case 0x30:
			return ']';
		case 0x31:
			return '\\';
		case 0x33:
			return ';';
		case 0x34:
			return "'";
		case 0x35:
			return '`';
		case 0x36:
			return ',';
		case 0x37:
			return '.';
		case 0x38:
			return '/';
		case 0x39:
			return 'Cap';
		case 0x46:
			return 'PSc';
		case 0x47:
			return 'Scr';
		case 0x48:
			return 'Pau';
		case 0x49:
			return 'Ins';
		case 0x4a:
			return 'Hm';
		case 0x4b:
			return 'PU';
		case 0x4c:
			return 'Del';
		case 0x4d:
			return 'End';
		case 0x4e:
			return 'PD';
		case 0x4f:
			return 'Rt';
		case 0x50:
			return 'Lt';
		case 0x51:
			return 'Dn';
		case 0x52:
			return 'Up';
		case 0x53:
			return 'Num';
		case 0x54:
			return 'N/';
		case 0x55:
			return 'N*';
		case 0x56:
			return 'N-';
		case 0x57:
			return 'N+';
		case 0x58:
			return 'NE';
		case 0x65:
			return 'App';
		case 0x66:
			return 'Pwr';
		case 0x67:
			return 'NEq';
		case 0xe0:
			return 'CL';
		case 0xe1:
			return 'SL';
		case 0xe2:
			return 'AL';
		case 0xe3:
			return 'GL';
		case 0xe4:
			return 'CR';
		case 0xe5:
			return 'SR';
		case 0xe6:
			return 'AR';
		case 0xe7:
			return 'GR';
		case 0xe8:
			return 'Nxt';
		case 0xe9:
			return 'Prv';
		case 0xf0:
			return 'Stp';
		case 0xf1:
			return 'P/P';
		case 0xf2:
			return 'Mut';
		case 0xf3:
			return 'V+';
		case 0xf4:
			return 'V-';
	}
	if (code >= 0x3a && code <= 0x45) return 'F' + (code - 0x3a + 1);
	if (code >= 0x68 && code <= 0x73) return 'F' + (code - 0x68 + 13);
	if (code >= 0x59 && code <= 0x61) return 'N' + (code - 0x59 + 1);
	if (code === 0x62) return 'N0';
	if (code === 0x63) return 'N.';
	return '';
}

function modifierPrefix(mask: number): string {
	const names = ['CL', 'SL', 'AL', 'GL', 'CR', 'SR', 'AR', 'GR'];
	let prefix = '';
	for (let bit = 0; bit < 8; bit++) {
		if (mask & (1 << bit)) {
			prefix += names[bit];
			prefix += '+';
		}
	}
	return prefix;
}

export class ButtonLayoutScreen {
	private gfx: GFX;
	private config: ScreenConfig;
	private widgets: GPButtonLayout[];
	private viewport: GPViewport;

	private isInputHistoryEnabled = false;
	private inputHistoryLength = 0;
	private inputHistoryTimeout = 0;
	private lastInputTime = 0;

	private statusBar = '';
	private statusBarRight = '';
	private footer = '';
	private historyString = '';
	private inputHistory: string[] = [];
	private lastInput: boolean[] = new Array(INPUT_HISTORY_MAX_INPUTS).fill(
		false,
	);

	private bannerDisplay = true;
	private bannerDelay = 2000;
	private bannerDelayStart = 0;
	private bannerMessage = '';
	private prevProfileNumber = -1;

	constructor(gfx: GFX, config: ScreenConfig) {
		this.gfx = gfx;
		this.config = config;
		this.isInputHistoryEnabled = !!config.displayOptions.inputHistoryEnabled;
		this.inputHistoryLength = config.displayOptions.inputHistoryLength ?? 21;
		this.inputHistoryTimeout = config.displayOptions.inputHistoryTimeout ?? 0;
		this.lastInputTime = 0;

		this.viewport = this.isInputHistoryEnabled
			? { top: 8, left: 0, bottom: 56, right: SCREEN_WIDTH }
			: { top: 0, left: 0, bottom: 64, right: SCREEN_WIDTH };

		const orientation = config.displayOptions.buttonLayoutOrientation ?? 0;
		const custom = config.displayOptions.buttonLayoutCustomOptions;
		const layoutA = getLayoutA(
			config.buttonLayout,
			config.buttonLayoutRight,
			orientation,
			custom?.params,
			custom?.paramsRight,
			config.boardLayoutA,
			config.boardLayoutB,
		);
		const layoutB = getLayoutB(
			config.buttonLayout,
			config.buttonLayoutRight,
			orientation,
			custom?.params,
			custom?.paramsRight,
			config.boardLayoutA,
			config.boardLayoutB,
		);
		this.widgets = [...layoutA, ...layoutB];

		this.bannerDisplay = true;
		this.prevProfileNumber = -1;
		this.footer = '';
		this.historyString = '';
		this.inputHistory = [];
		this.lastInput.fill(false);
	}

	render(input: GamepadInput, nowMs: number) {
		this.update(input, nowMs);
		this.draw(input);
	}

	private update(input: GamepadInput, nowMs: number) {
		const profileNumber = this.config.profileNumber;
		if (this.prevProfileNumber !== profileNumber) {
			this.bannerDelayStart = nowMs;
			this.prevProfileNumber = profileNumber;
			this.bannerDisplay = true;
		}
		this.generateHeader(nowMs);
		if (this.isInputHistoryEnabled) {
			this.processInputHistory(input, nowMs);
		}
	}

	private draw(input: GamepadInput) {
		this.gfx.clearScreen();
		for (const widget of this.widgets) {
			drawWidget(widget, {
				gfx: this.gfx,
				viewport: this.viewport,
				width: 128,
				height: 64,
				buttons: input.buttons,
				dpad: input.dpad,
				heldPins: input.heldPins ?? [],
			});
		}
		this.drawScreen();
	}

	private drawScreen() {
		if (this.bannerDisplay) {
			this.gfx.drawRectangle(0, 0, 128, 7, 0, 1, 0);
			this.gfx.drawText(0, 0, this.statusBar, 0);
		} else {
			const rightX = 21 - this.statusBarRight.length;
			this.gfx.drawText(0, 0, this.statusBar);
			if (this.statusBarRight) {
				this.gfx.drawText(rightX, 0, this.statusBarRight);
			}
		}
		this.gfx.drawText(0, 7, this.footer);
	}

	private generateHeader(nowMs: number) {
		this.statusBar = '';
		if (this.bannerDisplay) {
			if ((nowMs - this.bannerDelayStart) / 1000 < this.bannerDelay / 1000) {
				if (!this.bannerMessage) {
					if (this.config.profileLabel) {
						this.statusBar = this.config.profileLabel.toUpperCase();
					} else {
						this.statusBar = `PROFILE ${this.config.profileNumber}`;
					}
				} else {
					this.statusBar = this.bannerMessage;
				}
				return;
			}
			this.bannerDisplay = false;
			this.bannerMessage = '';
		}

		this.statusBarRight = '';
		const display = this.config.displayOptions;
		const gamepad = this.config.gamepadOptions;

		if (display.inputMode) {
			this.statusBar += inputModeString(gamepad.inputMode ?? 0);
		}

		if (display.profileMode) {
			this.statusBarRight += ' Pr:';
			if (this.config.profileLabel) {
				this.statusBarRight += this.config.profileLabel.toUpperCase();
			} else {
				this.statusBarRight += String(this.config.profileNumber);
			}
		}

		if (display.macroMode && this.config.macroEnabled) {
			this.statusBarRight += ' M';
		}

		if (display.dpadMode) {
			switch (gamepad.dpadMode) {
				case DPAD_MODE.DIGITAL:
					this.statusBarRight += ' D';
					break;
				case DPAD_MODE.LEFT_ANALOG:
					this.statusBarRight += ' L';
					break;
				case DPAD_MODE.RIGHT_ANALOG:
					this.statusBarRight += ' R';
					break;
			}
		}

		if (display.socdMode) {
			switch (gamepad.socdMode) {
				case SOCD_MODE.NEUTRAL:
					this.statusBarRight += ' SOCD-N';
					break;
				case SOCD_MODE.UP_PRIORITY:
					this.statusBarRight += ' SOCD-U';
					break;
				case SOCD_MODE.SECOND_INPUT_PRIORITY:
					this.statusBarRight += ' SOCD-L';
					break;
				case SOCD_MODE.FIRST_INPUT_PRIORITY:
					this.statusBarRight += ' SOCD-F';
					break;
				case SOCD_MODE.BYPASS:
					this.statusBarRight += ' SOCD-X';
					break;
			}
		}

		this.statusBar = this.statusBar.trimStart();
		this.statusBarRight = this.statusBarRight.trimStart();
	}

	private pressedUp(input: GamepadInput): boolean {
		return (input.dpad & GAMEPAD_MASK.UP) === GAMEPAD_MASK.UP;
	}
	private pressedDown(input: GamepadInput): boolean {
		return (input.dpad & GAMEPAD_MASK.DOWN) === GAMEPAD_MASK.DOWN;
	}
	private pressedLeft(input: GamepadInput): boolean {
		return (input.dpad & GAMEPAD_MASK.LEFT) === GAMEPAD_MASK.LEFT;
	}
	private pressedRight(input: GamepadInput): boolean {
		return (input.dpad & GAMEPAD_MASK.RIGHT) === GAMEPAD_MASK.RIGHT;
	}
	private pressedUpLeft(input: GamepadInput): boolean {
		return (
			(input.dpad & (GAMEPAD_MASK.UP | GAMEPAD_MASK.LEFT)) ===
			(GAMEPAD_MASK.UP | GAMEPAD_MASK.LEFT)
		);
	}
	private pressedUpRight(input: GamepadInput): boolean {
		return (
			(input.dpad & (GAMEPAD_MASK.UP | GAMEPAD_MASK.RIGHT)) ===
			(GAMEPAD_MASK.UP | GAMEPAD_MASK.RIGHT)
		);
	}
	private pressedDownLeft(input: GamepadInput): boolean {
		return (
			(input.dpad & (GAMEPAD_MASK.DOWN | GAMEPAD_MASK.LEFT)) ===
			(GAMEPAD_MASK.DOWN | GAMEPAD_MASK.LEFT)
		);
	}
	private pressedDownRight(input: GamepadInput): boolean {
		return (
			(input.dpad & (GAMEPAD_MASK.DOWN | GAMEPAD_MASK.RIGHT)) ===
			(GAMEPAD_MASK.DOWN | GAMEPAD_MASK.RIGHT)
		);
	}
	private pressedButton(input: GamepadInput, mask: number): boolean {
		return (input.buttons & mask) === mask;
	}

	private processInputHistory(input: GamepadInput, nowMs: number) {
		const pressed: string[] = [];
		const currentInput: boolean[] = [
			this.pressedUp(input),
			this.pressedDown(input),
			this.pressedLeft(input),
			this.pressedRight(input),
			this.pressedUpLeft(input),
			this.pressedUpRight(input),
			this.pressedDownLeft(input),
			this.pressedDownRight(input),
			this.pressedButton(input, GAMEPAD_MASK.B1),
			this.pressedButton(input, GAMEPAD_MASK.B2),
			this.pressedButton(input, GAMEPAD_MASK.B3),
			this.pressedButton(input, GAMEPAD_MASK.B4),
			this.pressedButton(input, GAMEPAD_MASK.L1),
			this.pressedButton(input, GAMEPAD_MASK.R1),
			this.pressedButton(input, GAMEPAD_MASK.L2),
			this.pressedButton(input, GAMEPAD_MASK.R2),
			this.pressedButton(input, GAMEPAD_MASK.S1),
			this.pressedButton(input, GAMEPAD_MASK.S2),
			this.pressedButton(input, GAMEPAD_MASK.L3),
			this.pressedButton(input, GAMEPAD_MASK.R3),
			this.pressedButton(input, GAMEPAD_MASK.A1),
			this.pressedButton(input, GAMEPAD_MASK.A2),
		];

		for (const b of currentInput) {
			if (b) {
				this.lastInputTime = nowMs;
				break;
			}
		}

		const inputMode = this.config.gamepadOptions.inputMode ?? 0;
		let mode = DISPLAY_MODE_LOOKUP[inputMode] ?? 0;
		if (
			(inputMode === INPUT_MODE.SWITCH ||
				inputMode === INPUT_MODE.SWITCH_PRO) &&
			!this.config.gamepadOptions.useNintendoLayout
		) {
			mode = 2;
		}

		if (!this.inputsEqual(this.lastInput, currentInput)) {
			let perPinKeycode: number[] | null = null;
			let perPinModifier: number[] | null = null;
			if (mode === 3) {
				perPinKeycode = new Array(INPUT_HISTORY_MAX_INPUTS).fill(0);
				perPinModifier = new Array(INPUT_HISTORY_MAX_INPUTS).fill(0);
				for (let pin = 0; pin < 30; pin++) {
					const kc = this.config.keyboardKeycodes[pin] ?? 0;
					if (kc === 0) continue;
					const action = this.config.pinActions[pin];
					for (let i = 0; i < INPUT_HISTORY_MAX_INPUTS; i++) {
						if (action === IDX_ACTION[i]) {
							perPinKeycode[i] = kc;
							perPinModifier[i] = this.config.keyboardModifierMasks[pin] ?? 0;
							break;
						}
					}
				}
			}

			for (let x = 0; x < INPUT_HISTORY_MAX_INPUTS; x++) {
				let inputChar: string;
				if (perPinKeycode) {
					inputChar = perPinKeycode[x]
						? modifierPrefix(perPinModifier![x]) +
							keycodeToName(perPinKeycode[x])
						: '';
				} else {
					inputChar = DISPLAY_NAMES[mode]?.[x] ?? '';
				}
				if (currentInput[x] && inputChar) {
					pressed.push(inputChar);
				}
			}
			this.lastInput = [...currentInput];
		}

		if (pressed.length > 0) {
			this.inputHistory.push(pressed.join('+'));
		}

		if (this.inputHistory.length > this.inputHistoryLength / 2 + 1) {
			this.inputHistory.shift();
		}

		let ret = '';
		for (let i = this.inputHistory.length - 1; i >= 0; i--) {
			let newRet = ret;
			if (newRet) {
				newRet = ` ${newRet}`;
			}
			newRet = this.inputHistory[i] + newRet;
			ret = newRet;
			if (ret.length >= this.inputHistoryLength) {
				break;
			}
		}

		if (ret.length >= this.inputHistoryLength) {
			this.historyString = ret.substr(ret.length - this.inputHistoryLength);
		} else {
			this.historyString = ret;
		}

		if (this.inputHistoryTimeout > 0 && this.inputHistory.length > 0) {
			if (nowMs - this.lastInputTime > this.inputHistoryTimeout * 1000) {
				this.inputHistory = [];
				this.historyString = '';
			}
		}

		this.footer = this.historyString;
	}

	private inputsEqual(a: boolean[], b: boolean[]): boolean {
		for (let i = 0; i < INPUT_HISTORY_MAX_INPUTS; i++) {
			if (a[i] !== b[i]) return false;
		}
		return true;
	}
}

function inputModeString(mode: number): string {
	switch (mode) {
		case INPUT_MODE.PS3:
			return 'PS3';
		case INPUT_MODE.GENERIC:
			return 'USBHID';
		case INPUT_MODE.SWITCH:
			return 'SWITCH';
		case INPUT_MODE.MDMINI:
			return 'GEN/MD';
		case INPUT_MODE.NEOGEO:
			return 'NGMINI';
		case INPUT_MODE.PCEMINI:
			return 'PCE/TG';
		case INPUT_MODE.EGRET:
			return 'EGRET';
		case INPUT_MODE.ASTRO:
			return 'ASTRO';
		case INPUT_MODE.PSCLASSIC:
			return 'PSC';
		case INPUT_MODE.XBOXORIGINAL:
			return 'OGXBOX';
		case INPUT_MODE.SWITCH_PRO:
			return 'SWPRO';
		case INPUT_MODE.PS4:
			return 'PS4   ';
		case INPUT_MODE.PS5:
			return 'PS5   ';
		case INPUT_MODE.XBONE:
			return 'XBON*';
		case INPUT_MODE.XINPUT:
			return 'XINPUT';
		case INPUT_MODE.KEYBOARD:
			return 'HID-KB';
		case INPUT_MODE.CONFIG:
			return 'CONFIG';
		default:
			return '';
	}
}
