export const SCREEN_WIDTH = 128;
export const SCREEN_HEIGHT = 64;
export const FONT_WIDTH = 6;
export const FONT_HEIGHT = 8;
export const FONT_CHAR_OFFSET = 32;
export const MAX_TEXT_CHARS = SCREEN_WIDTH / FONT_WIDTH;

export const GP_ELEMENT = {
	WIDGET: 0,
	SCREEN: 1,
	BTN_BUTTON: 2,
	DIR_BUTTON: 3,
	PIN_BUTTON: 4,
	LEVER: 5,
	LABEL: 6,
	SPRITE: 7,
	SHAPE: 8,
} as const;

export const GP_SHAPE = {
	ELLIPSE: 0,
	SQUARE: 1,
	LINE: 2,
	POLYGON: 3,
	ARC: 4,
};

export const GP_BUTTON_TURBO_SCALE = 0.7;

export const GAMEPAD_MASK = {
	UP: 1 << 0,
	DOWN: 1 << 1,
	LEFT: 1 << 2,
	RIGHT: 1 << 3,
	B1: 1 << 0,
	B2: 1 << 1,
	B3: 1 << 2,
	B4: 1 << 3,
	L1: 1 << 4,
	R1: 1 << 5,
	L2: 1 << 6,
	R2: 1 << 7,
	S1: 1 << 8,
	S2: 1 << 9,
	L3: 1 << 10,
	R3: 1 << 11,
	A1: 1 << 12,
	A2: 1 << 13,
	A3: 1 << 14,
	A4: 1 << 15,
	E1: 1 << 20,
	E2: 1 << 21,
	E3: 1 << 22,
	E4: 1 << 23,
	E5: 1 << 24,
	E6: 1 << 25,
	E7: 1 << 26,
	E8: 1 << 27,
	E9: 1 << 28,
	E10: 1 << 29,
	E11: 1 << 30,
	E12: 1 << 31,
} as const;

export const DPAD_MODE = {
	DIGITAL: 0,
	LEFT_ANALOG: 1,
	RIGHT_ANALOG: 2,
} as const;

export const INPUT_MODE = {
	XINPUT: 0,
	SWITCH: 1,
	PS3: 2,
	KEYBOARD: 3,
	PS4: 4,
	XBONE: 5,
	MDMINI: 6,
	NEOGEO: 7,
	PCEMINI: 8,
	EGRET: 9,
	ASTRO: 10,
	PSCLASSIC: 11,
	XBOXORIGINAL: 12,
	PS5: 13,
	GENERIC: 14,
	SWITCH_PRO: 15,
	CONFIG: 255,
} as const;

export const SOCD_MODE = {
	UP_PRIORITY: 0,
	NEUTRAL: 1,
	SECOND_INPUT_PRIORITY: 2,
	FIRST_INPUT_PRIORITY: 3,
	BYPASS: 4,
} as const;

export const BUTTON_ORIENTATION = {
	DEFAULT: 0,
	SOUTHPAW: 1,
	SWITCHED: 2,
} as const;

export type GPButtonParameters = {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
	stroke: number;
	fill: number;
	value: number;
	shape: number;
	angleStart: number;
	angleEnd: number;
	closed: number;
};

export type GPButtonLayout = {
	elementType: number;
	parameters: GPButtonParameters;
};

export type GPViewport = {
	top: number;
	left: number;
	bottom: number;
	right: number;
};

export type DisplayOptions = {
	enabled?: boolean;
	flipDisplay?: number;
	invertDisplay?: number;
	buttonLayout?: number;
	buttonLayoutRight?: number;
	splashMode?: number;
	splashChoice?: number;
	splashDuration?: number;
	displaySaverTimeout?: number;
	displaySaverMode?: number;
	buttonLayoutOrientation?: number;
	turnOffWhenSuspended?: number;
	inputMode?: number;
	turboMode?: number;
	dpadMode?: number;
	socdMode?: number;
	macroMode?: number;
	profileMode?: number;
	inputHistoryEnabled?: number;
	inputHistoryLength?: number;
	inputHistoryCol?: number;
	inputHistoryRow?: number;
	inputHistoryTimeout?: number;
	buttonLayoutCustomOptions?: {
		params?: ButtonLayoutCustomParams;
		paramsRight?: ButtonLayoutCustomParams;
	};
};

export type ButtonLayoutCustomParams = {
	layout: number;
	startX: number;
	startY: number;
	buttonRadius: number;
	buttonPadding: number;
};

export type GamepadOptions = {
	inputMode?: number;
	dpadMode?: number;
	socdMode?: number;
	useNintendoLayout?: boolean;
};

export type GamepadInput = {
	buttons: number;
	dpad: number;
	activeDpadMode: number;
	heldPins: number[];
};

export type ScreenConfig = {
	displayOptions: DisplayOptions;
	gamepadOptions: GamepadOptions;
	buttonLayout: number;
	buttonLayoutRight: number;
	profileNumber: number;
	profileLabel: string;
	macroEnabled: boolean;
	pinActions: number[];
	keyboardKeycodes: number[];
	keyboardModifierMasks: number[];
	boardLayoutA?: GPButtonLayout[];
	boardLayoutB?: GPButtonLayout[];
};
