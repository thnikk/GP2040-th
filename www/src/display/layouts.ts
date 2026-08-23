import { GPButtonLayout, GPButtonParameters, GP_SHAPE } from './types';

type Elem = [
	elementType: number,
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	stroke: number,
	fill: number,
	value: number,
	shape?: number,
	angleStart?: number,
	angleEnd?: number,
	closed?: number,
];

function el(e: Elem): GPButtonLayout {
	const parameters: GPButtonParameters = {
		x1: e[1],
		y1: e[2],
		x2: e[3],
		y2: e[4],
		stroke: e[5],
		fill: e[6],
		value: e[7],
		shape: e[8] ?? 0,
		angleStart: e[9] ?? 0,
		angleEnd: e[10] ?? 0,
		closed: e[11] ?? 0,
	};
	return { elementType: e[0], parameters };
}

const map = (arr: Elem[]): GPButtonLayout[] => arr.map(el);

// GP_ELEMENT constants (mirror proto/enums.proto)
const BTN = 2; // GP_ELEMENT_BTN_BUTTON
const DIR = 3; // GP_ELEMENT_DIR_BUTTON
const LEVER = 5; // GP_ELEMENT_LEVER
const SHAPE = 8; // GP_ELEMENT_SHAPE

// GP_SHAPE constants (mirror proto/enums.proto)
const ELLIPSE = 0;
const SQUARE = 1;
const POLYGON = 3;
const ARC = 4;

// GAMEPAD_MASK values (mirror GamepadState.h)
const M_UP = 1 << 0;
const M_DOWN = 1 << 1;
const M_LEFT = 1 << 2;
const M_RIGHT = 1 << 3;
const M_B1 = 1 << 0;
const M_B2 = 1 << 1;
const M_B3 = 1 << 2;
const M_B4 = 1 << 3;
const M_L1 = 1 << 4;
const M_R1 = 1 << 5;
const M_L2 = 1 << 6;
const M_R2 = 1 << 7;
const M_S1 = 1 << 8;
const M_S2 = 1 << 9;
const M_L3 = 1 << 10;
const M_R3 = 1 << 11;
const M_A1 = 1 << 12;
const M_A2 = 1 << 13;

export const LAYOUTS: Record<string, GPButtonLayout[]> = {
	ARCADE_STICK: map([[LEVER, 17, 37, 10, 10, 1, 0, 0]]),
	VLXA: map([[LEVER, 15, 36, 8, 8, 1, 0, 0]]),
	FIGHTBOARD_STICK: map([[LEVER, 27, 31, 10, 10, 1, 0, 0]]),
	FIGHTBOARD_STICK_MIRRORED: map([[LEVER, 99, 31, 10, 10, 1, 0, 0]]),
	TWINSTICK_A: map([[LEVER, 17, 37, 10, 10, 1, 0, 0]]),
	TWINSTICK_B: map([[LEVER, 109, 37, 10, 10, 1, 0, 0]]),
	STICKLESS: map([
		[DIR, 8, 20, 8, 8, 1, 1, M_LEFT, ELLIPSE],
		[DIR, 26, 20, 8, 8, 1, 1, M_DOWN, ELLIPSE],
		[DIR, 41, 29, 8, 8, 1, 1, M_RIGHT, ELLIPSE],
		[DIR, 48, 53, 8, 8, 1, 1, M_UP, ELLIPSE],
	]),
	WASD_BOX: map([
		[DIR, 8, 39, 18, 49, 1, 1, M_LEFT, SQUARE],
		[DIR, 19, 39, 29, 49, 1, 1, M_DOWN, SQUARE],
		[DIR, 19, 28, 29, 38, 1, 1, M_UP, SQUARE],
		[DIR, 30, 39, 40, 49, 1, 1, M_RIGHT, SQUARE],
	]),
	UDLR: map([
		[DIR, 8, 36, 7, 7, 1, 1, M_LEFT, ELLIPSE],
		[DIR, 25, 42, 7, 7, 1, 1, M_DOWN, ELLIPSE],
		[DIR, 33, 25, 7, 7, 1, 1, M_UP, ELLIPSE],
		[DIR, 42, 49, 7, 7, 1, 1, M_RIGHT, ELLIPSE],
	]),
	FIGHTBOARD_MIRRORED: map([
		[BTN, 9, 18, 7, 7, 1, 1, M_L1, ELLIPSE],
		[BTN, 25, 18, 7, 7, 1, 1, M_R1, ELLIPSE],
		[BTN, 41, 18, 7, 7, 1, 1, M_B4, ELLIPSE],
		[BTN, 57, 27, 7, 7, 1, 1, M_B3, ELLIPSE],
		[BTN, 9, 34, 7, 7, 1, 1, M_L2, ELLIPSE],
		[BTN, 25, 34, 7, 7, 1, 1, M_R2, ELLIPSE],
		[BTN, 41, 34, 7, 7, 1, 1, M_B2, ELLIPSE],
		[BTN, 57, 42, 7, 7, 1, 1, M_B1, ELLIPSE],
		[BTN, 8, 46, 3, 3, 1, 1, M_L3, ELLIPSE],
		[BTN, 17, 46, 3, 3, 1, 1, M_S1, ELLIPSE],
		[BTN, 26, 46, 3, 3, 1, 1, M_A1, ELLIPSE],
		[BTN, 34, 46, 3, 3, 1, 1, M_S2, ELLIPSE],
		[BTN, 44, 46, 3, 3, 1, 1, M_R3, ELLIPSE],
	]),
	MAME_A: map([
		[DIR, 8, 37, 7, 7, 1, 1, M_LEFT, ELLIPSE],
		[DIR, 23, 24, 7, 7, 1, 1, M_UP, ELLIPSE],
		[DIR, 23, 50, 7, 7, 1, 1, M_DOWN, ELLIPSE],
		[DIR, 37, 37, 7, 7, 1, 1, M_RIGHT, ELLIPSE],
	]),
	MAME_B: map([
		[BTN, 68, 28, 78, 38, 1, 1, M_B3, SQUARE],
		[BTN, 79, 28, 89, 38, 1, 1, M_B4, SQUARE],
		[BTN, 90, 28, 100, 38, 1, 1, M_R1, SQUARE],
		[BTN, 68, 39, 78, 49, 1, 1, M_B1, SQUARE],
		[BTN, 79, 39, 89, 49, 1, 1, M_B2, SQUARE],
		[BTN, 90, 39, 100, 49, 1, 1, M_R2, SQUARE],
	]),
	MAME_8B: map([
		[BTN, 68, 28, 78, 38, 1, 1, M_B3, SQUARE],
		[BTN, 79, 25, 89, 35, 1, 1, M_B4, SQUARE],
		[BTN, 90, 25, 100, 35, 1, 1, M_R1, SQUARE],
		[BTN, 101, 28, 111, 38, 1, 1, M_L1, SQUARE],
		[BTN, 68, 39, 78, 49, 1, 1, M_B1, SQUARE],
		[BTN, 79, 36, 89, 46, 1, 1, M_B2, SQUARE],
		[BTN, 90, 36, 100, 46, 1, 1, M_R2, SQUARE],
		[BTN, 101, 39, 111, 49, 1, 1, M_L2, SQUARE],
	]),
	OPEN_CORE_WASD_A: map([
		[DIR, 16, 39, 26, 49, 1, 1, M_LEFT, SQUARE],
		[DIR, 27, 39, 37, 49, 1, 1, M_DOWN, SQUARE],
		[DIR, 27, 28, 37, 38, 1, 1, M_UP, SQUARE],
		[DIR, 38, 39, 48, 49, 1, 1, M_RIGHT, SQUARE],
		[BTN, 6, 19, 3, 3, 1, 1, M_S2, ELLIPSE],
		[BTN, 14, 19, 3, 3, 1, 1, M_S1, ELLIPSE],
		[BTN, 23, 19, 3, 3, 1, 1, M_A1, ELLIPSE],
		[BTN, 31, 19, 3, 3, 1, 1, M_A2, ELLIPSE],
		[BTN, 39, 19, 3, 3, 1, 1, M_L3, ELLIPSE],
		[BTN, 47, 19, 3, 3, 1, 1, M_R3, ELLIPSE],
	]),
	OPEN_CORE_WASD_B: map([
		[BTN, 68, 28, 78, 38, 1, 1, M_B3, SQUARE],
		[BTN, 79, 25, 89, 35, 1, 1, M_B4, SQUARE],
		[BTN, 90, 25, 100, 35, 1, 1, M_R1, SQUARE],
		[BTN, 101, 28, 111, 38, 1, 1, M_L1, SQUARE],
		[BTN, 68, 39, 78, 49, 1, 1, M_B1, SQUARE],
		[BTN, 79, 36, 89, 46, 1, 1, M_B2, SQUARE],
		[BTN, 90, 36, 100, 46, 1, 1, M_R2, SQUARE],
		[BTN, 101, 39, 111, 49, 1, 1, M_L2, SQUARE],
	]),
	KEYBOARD_ANGLED: map([
		[DIR, 8, 37, 16, 45, 1, 1, M_LEFT, SQUARE, 45],
		[DIR, 23, 24, 31, 32, 1, 1, M_UP, SQUARE, 45],
		[DIR, 23, 50, 31, 58, 1, 1, M_DOWN, SQUARE, 45],
		[DIR, 37, 37, 45, 45, 1, 1, M_RIGHT, SQUARE, 45],
	]),
	VEWLIX: map([
		[BTN, 57, 31, 8, 8, 1, 1, M_B3, ELLIPSE],
		[BTN, 75, 24, 8, 8, 1, 1, M_B4, ELLIPSE],
		[BTN, 93, 24, 8, 8, 1, 1, M_R1, ELLIPSE],
		[BTN, 111, 24, 8, 8, 1, 1, M_L1, ELLIPSE],
		[BTN, 51, 49, 8, 8, 1, 1, M_B1, ELLIPSE],
		[BTN, 69, 42, 8, 8, 1, 1, M_B2, ELLIPSE],
		[BTN, 87, 42, 8, 8, 1, 1, M_R2, ELLIPSE],
		[BTN, 105, 42, 8, 8, 1, 1, M_L2, ELLIPSE],
	]),
	VLXB: map([
		[BTN, 50, 31, 7, 7, 1, 1, M_B3, ELLIPSE],
		[BTN, 66, 24, 7, 7, 1, 1, M_B4, ELLIPSE],
		[BTN, 82, 24, 7, 7, 1, 1, M_R1, ELLIPSE],
		[BTN, 98, 24, 7, 7, 1, 1, M_L1, ELLIPSE],
		[BTN, 45, 47, 7, 7, 1, 1, M_B1, ELLIPSE],
		[BTN, 61, 40, 7, 7, 1, 1, M_B2, ELLIPSE],
		[BTN, 77, 40, 7, 7, 1, 1, M_R2, ELLIPSE],
		[BTN, 93, 40, 7, 7, 1, 1, M_L2, ELLIPSE],
		[BTN, 119, 33, 5, 5, 1, 1, M_S2, ELLIPSE],
	]),
	VLXB_6B: map([
		[BTN, 50, 31, 7, 7, 1, 1, M_B3, ELLIPSE],
		[BTN, 66, 24, 7, 7, 1, 1, M_B4, ELLIPSE],
		[BTN, 82, 24, 7, 7, 1, 1, M_R1, ELLIPSE],
		[BTN, 45, 47, 7, 7, 1, 1, M_B1, ELLIPSE],
		[BTN, 61, 40, 7, 7, 1, 1, M_B2, ELLIPSE],
		[BTN, 77, 40, 7, 7, 1, 1, M_R2, ELLIPSE],
		[BTN, 119, 33, 5, 5, 1, 1, M_S2, ELLIPSE],
	]),
	FIGHTBOARD: map([
		[BTN, 67, 27, 7, 7, 1, 1, M_B3, ELLIPSE],
		[BTN, 84, 18, 7, 7, 1, 1, M_B4, ELLIPSE],
		[BTN, 101, 18, 7, 7, 1, 1, M_R1, ELLIPSE],
		[BTN, 118, 18, 7, 7, 1, 1, M_L1, ELLIPSE],
		[BTN, 67, 43, 7, 7, 1, 1, M_B1, ELLIPSE],
		[BTN, 84, 35, 7, 7, 1, 1, M_B2, ELLIPSE],
		[BTN, 101, 35, 7, 7, 1, 1, M_R2, ELLIPSE],
		[BTN, 118, 35, 7, 7, 1, 1, M_L2, ELLIPSE],
		[BTN, 82, 47, 3, 3, 1, 1, M_L3, ELLIPSE],
		[BTN, 92, 47, 3, 3, 1, 1, M_S1, ELLIPSE],
		[BTN, 101, 47, 3, 3, 1, 1, M_A1, ELLIPSE],
		[BTN, 110, 47, 3, 3, 1, 1, M_S2, ELLIPSE],
		[BTN, 120, 47, 3, 3, 1, 1, M_R3, ELLIPSE],
	]),
	VEWLIX7: map([
		[BTN, 57, 31, 8, 8, 1, 1, M_B3, ELLIPSE],
		[BTN, 75, 24, 8, 8, 1, 1, M_B4, ELLIPSE],
		[BTN, 93, 24, 8, 8, 1, 1, M_R1, ELLIPSE],
		[BTN, 111, 24, 8, 8, 1, 1, M_L1, ELLIPSE],
		[BTN, 51, 49, 8, 8, 1, 1, M_B1, ELLIPSE],
		[BTN, 69, 42, 8, 8, 1, 1, M_B2, ELLIPSE],
		[BTN, 87, 42, 8, 8, 1, 1, M_R2, ELLIPSE],
	]),
	SEGA_2P: map([
		[BTN, 57, 34, 8, 8, 1, 1, M_B3, ELLIPSE],
		[BTN, 75, 24, 8, 8, 1, 1, M_B4, ELLIPSE],
		[BTN, 93, 24, 8, 8, 1, 1, M_R1, ELLIPSE],
		[BTN, 111, 28, 8, 8, 1, 1, M_L1, ELLIPSE],
		[BTN, 57, 52, 8, 8, 1, 1, M_B1, ELLIPSE],
		[BTN, 75, 42, 8, 8, 1, 1, M_B2, ELLIPSE],
		[BTN, 93, 42, 8, 8, 1, 1, M_R2, ELLIPSE],
		[BTN, 111, 46, 8, 8, 1, 1, M_L2, ELLIPSE],
	]),
	SEGA_2P_6B: map([
		[BTN, 57, 34, 8, 8, 1, 1, M_B3, ELLIPSE],
		[BTN, 75, 24, 8, 8, 1, 1, M_B4, ELLIPSE],
		[BTN, 93, 24, 8, 8, 1, 1, M_R1, ELLIPSE],
		[BTN, 57, 52, 8, 8, 1, 1, M_B1, ELLIPSE],
		[BTN, 75, 42, 8, 8, 1, 1, M_B2, ELLIPSE],
		[BTN, 93, 42, 8, 8, 1, 1, M_R2, ELLIPSE],
	]),
	NOIR8: map([
		[BTN, 57, 33, 8, 8, 1, 1, M_B3, ELLIPSE],
		[BTN, 75, 24, 8, 8, 1, 1, M_B4, ELLIPSE],
		[BTN, 93, 24, 8, 8, 1, 1, M_R1, ELLIPSE],
		[BTN, 111, 28, 8, 8, 1, 1, M_L1, ELLIPSE],
		[BTN, 57, 51, 8, 8, 1, 1, M_B1, ELLIPSE],
		[BTN, 75, 42, 8, 8, 1, 1, M_B2, ELLIPSE],
		[BTN, 93, 42, 8, 8, 1, 1, M_R2, ELLIPSE],
		[BTN, 111, 46, 8, 8, 1, 1, M_L2, ELLIPSE],
	]),
	CAPCOM: map([
		[BTN, 62, 28, 8, 8, 1, 1, M_B3, ELLIPSE],
		[BTN, 80, 28, 8, 8, 1, 1, M_B4, ELLIPSE],
		[BTN, 98, 28, 8, 8, 1, 1, M_R1, ELLIPSE],
		[BTN, 116, 28, 8, 8, 1, 1, M_L1, ELLIPSE],
		[BTN, 62, 46, 8, 8, 1, 1, M_B1, ELLIPSE],
		[BTN, 80, 46, 8, 8, 1, 1, M_B2, ELLIPSE],
		[BTN, 98, 46, 8, 8, 1, 1, M_R2, ELLIPSE],
		[BTN, 116, 46, 8, 8, 1, 1, M_L2, ELLIPSE],
	]),
	CAPCOM6: map([
		[BTN, 74, 28, 8, 8, 1, 1, M_B3, ELLIPSE],
		[BTN, 92, 28, 8, 8, 1, 1, M_B4, ELLIPSE],
		[BTN, 110, 28, 8, 8, 1, 1, M_R1, ELLIPSE],
		[BTN, 74, 46, 8, 8, 1, 1, M_B1, ELLIPSE],
		[BTN, 92, 46, 8, 8, 1, 1, M_B2, ELLIPSE],
		[BTN, 110, 46, 8, 8, 1, 1, M_R2, ELLIPSE],
	]),
	STICKLESS_BUTTONS: map([
		[BTN, 57, 20, 8, 8, 1, 1, M_B3, ELLIPSE],
		[BTN, 75, 16, 8, 8, 1, 1, M_B4, ELLIPSE],
		[BTN, 93, 16, 8, 8, 1, 1, M_R1, ELLIPSE],
		[BTN, 111, 20, 8, 8, 1, 1, M_L1, ELLIPSE],
		[BTN, 57, 38, 8, 8, 1, 1, M_B1, ELLIPSE],
		[BTN, 75, 34, 8, 8, 1, 1, M_B2, ELLIPSE],
		[BTN, 93, 34, 8, 8, 1, 1, M_R2, ELLIPSE],
		[BTN, 111, 38, 8, 8, 1, 1, M_L2, ELLIPSE],
	]),
	WASD_BUTTONS: map([
		[BTN, 67, 28, 7, 7, 1, 1, M_B3, ELLIPSE],
		[BTN, 84, 24, 7, 7, 1, 1, M_B4, ELLIPSE],
		[BTN, 101, 24, 7, 7, 1, 1, M_R1, ELLIPSE],
		[BTN, 118, 28, 7, 7, 1, 1, M_L1, ELLIPSE],
		[BTN, 61, 45, 7, 7, 1, 1, M_B1, ELLIPSE],
		[BTN, 78, 41, 7, 7, 1, 1, M_B2, ELLIPSE],
		[BTN, 95, 41, 7, 7, 1, 1, M_R2, ELLIPSE],
		[BTN, 112, 45, 7, 7, 1, 1, M_L2, ELLIPSE],
	]),
	ARCADE_BUTTONS: map([
		[BTN, 62, 28, 8, 8, 1, 1, M_B3, ELLIPSE],
		[BTN, 80, 24, 8, 8, 1, 1, M_B4, ELLIPSE],
		[BTN, 98, 24, 8, 8, 1, 1, M_R1, ELLIPSE],
		[BTN, 116, 28, 8, 8, 1, 1, M_L1, ELLIPSE],
		[BTN, 57, 46, 8, 8, 1, 1, M_B1, ELLIPSE],
		[BTN, 75, 42, 8, 8, 1, 1, M_B2, ELLIPSE],
		[BTN, 93, 42, 8, 8, 1, 1, M_R2, ELLIPSE],
		[BTN, 111, 46, 8, 8, 1, 1, M_L2, ELLIPSE],
	]),
	STICKLESS13A: map([
		[DIR, 39, 15, 6, 6, 1, 1, M_UP, ELLIPSE],
		[DIR, 18, 27, 6, 6, 1, 1, M_LEFT, ELLIPSE],
		[DIR, 32, 27, 6, 6, 1, 1, M_DOWN, ELLIPSE],
		[DIR, 44, 34, 6, 6, 1, 1, M_RIGHT, ELLIPSE],
		[DIR, 49, 53, 6, 6, 1, 1, M_UP, ELLIPSE],
		[BTN, 65, 13, 2, 2, 1, 1, M_L3, ELLIPSE],
		[BTN, 72, 13, 2, 2, 1, 1, M_R3, ELLIPSE],
		[BTN, 79, 13, 2, 2, 1, 1, M_A2, ELLIPSE],
		[BTN, 86, 13, 2, 2, 1, 1, M_A1, ELLIPSE],
		[BTN, 93, 13, 2, 2, 1, 1, M_S1, ELLIPSE],
		[BTN, 100, 13, 2, 2, 1, 1, M_S2, ELLIPSE],
	]),
	STICKLESS_BUTTONS13B: map([
		[BTN, 56, 27, 6, 6, 1, 1, M_B3, ELLIPSE],
		[BTN, 70, 24, 6, 6, 1, 1, M_B4, ELLIPSE],
		[BTN, 84, 24, 6, 6, 1, 1, M_R1, ELLIPSE],
		[BTN, 98, 27, 6, 6, 1, 1, M_L1, ELLIPSE],
		[BTN, 56, 41, 6, 6, 1, 1, M_B1, ELLIPSE],
		[BTN, 70, 38, 6, 6, 1, 1, M_B2, ELLIPSE],
		[BTN, 84, 38, 6, 6, 1, 1, M_R2, ELLIPSE],
		[BTN, 98, 41, 6, 6, 1, 1, M_L2, ELLIPSE],
	]),
	STICKLESS16A: map([
		[DIR, 47, 19, 4, 4, 1, 1, M_UP, ELLIPSE],
		[DIR, 32, 27, 4, 4, 1, 1, M_LEFT, ELLIPSE],
		[DIR, 42, 27, 4, 4, 1, 1, M_DOWN, ELLIPSE],
		[DIR, 50, 32, 4, 4, 1, 1, M_RIGHT, ELLIPSE],
		[DIR, 52, 47, 4, 4, 1, 1, M_UP, ELLIPSE],
		[BTN, 64, 17, 4, 4, 1, 1, M_L3, ELLIPSE],
		[BTN, 42, 45, 4, 4, 1, 1, M_L3, ELLIPSE],
		[BTN, 66, 45, 4, 4, 1, 1, M_R3, ELLIPSE],
		[BTN, 77, 15, 2, 2, 1, 1, M_A2, ELLIPSE],
		[BTN, 82, 15, 2, 2, 1, 1, M_A1, ELLIPSE],
		[BTN, 87, 15, 2, 2, 1, 1, M_S1, ELLIPSE],
		[BTN, 92, 15, 2, 2, 1, 1, M_S2, ELLIPSE],
	]),
	STICKLESS_BUTTONS16B: map([
		[BTN, 59, 27, 4, 4, 1, 1, M_B3, ELLIPSE],
		[BTN, 69, 25, 4, 4, 1, 1, M_B4, ELLIPSE],
		[BTN, 79, 25, 4, 4, 1, 1, M_R1, ELLIPSE],
		[BTN, 89, 27, 4, 4, 1, 1, M_L1, ELLIPSE],
		[BTN, 59, 37, 4, 4, 1, 1, M_B1, ELLIPSE],
		[BTN, 69, 35, 4, 4, 1, 1, M_B2, ELLIPSE],
		[BTN, 79, 35, 4, 4, 1, 1, M_R2, ELLIPSE],
		[BTN, 89, 37, 4, 4, 1, 1, M_L2, ELLIPSE],
	]),
	STICKLESSR16A: map([
		[DIR, 47, 19, 4, 4, 1, 1, M_UP, ELLIPSE],
		[DIR, 32, 27, 4, 4, 1, 1, M_LEFT, ELLIPSE],
		[DIR, 42, 27, 4, 4, 1, 1, M_DOWN, ELLIPSE],
		[DIR, 50, 32, 4, 4, 1, 1, M_RIGHT, ELLIPSE],
		[DIR, 52, 47, 4, 4, 1, 1, M_UP, ELLIPSE],
		[BTN, 64, 17, 4, 4, 1, 1, M_L3, ELLIPSE],
		[BTN, 22, 30, 4, 4, 1, 1, M_L3, ELLIPSE],
		[BTN, 66, 45, 4, 4, 1, 1, M_R3, ELLIPSE],
		[BTN, 77, 15, 2, 2, 1, 1, M_A2, ELLIPSE],
		[BTN, 82, 15, 2, 2, 1, 1, M_A1, ELLIPSE],
		[BTN, 87, 15, 2, 2, 1, 1, M_S1, ELLIPSE],
		[BTN, 92, 15, 2, 2, 1, 1, M_S2, ELLIPSE],
	]),
	STICKLESS_BUTTONSR16B: map([
		[BTN, 59, 27, 4, 4, 1, 1, M_B3, ELLIPSE],
		[BTN, 69, 25, 4, 4, 1, 1, M_B4, ELLIPSE],
		[BTN, 79, 25, 4, 4, 1, 1, M_R1, ELLIPSE],
		[BTN, 89, 27, 4, 4, 1, 1, M_L1, ELLIPSE],
		[BTN, 59, 37, 4, 4, 1, 1, M_B1, ELLIPSE],
		[BTN, 69, 35, 4, 4, 1, 1, M_B2, ELLIPSE],
		[BTN, 79, 35, 4, 4, 1, 1, M_R2, ELLIPSE],
		[BTN, 89, 37, 4, 4, 1, 1, M_L2, ELLIPSE],
	]),
	STICKLESS14A: map([
		[DIR, 26, 20, 7, 7, 1, 1, M_LEFT, ELLIPSE],
		[DIR, 42, 20, 7, 7, 1, 1, M_DOWN, ELLIPSE],
		[DIR, 56, 28, 7, 7, 1, 1, M_RIGHT, ELLIPSE],
		[DIR, 62, 50, 7, 7, 1, 1, M_UP, ELLIPSE],
		[BTN, 10, 22, 7, 7, 1, 1, M_L3, ELLIPSE],
		[BTN, 84, 50, 7, 7, 1, 1, M_R3, ELLIPSE],
	]),
	STICKLESS_BUTTONS14B: map([
		[BTN, 70, 20, 7, 7, 1, 1, M_B3, ELLIPSE],
		[BTN, 86, 16, 7, 7, 1, 1, M_B4, ELLIPSE],
		[BTN, 102, 16, 7, 7, 1, 1, M_R1, ELLIPSE],
		[BTN, 118, 20, 7, 7, 1, 1, M_L1, ELLIPSE],
		[BTN, 70, 36, 7, 7, 1, 1, M_B1, ELLIPSE],
		[BTN, 86, 32, 7, 7, 1, 1, M_B2, ELLIPSE],
		[BTN, 102, 32, 7, 7, 1, 1, M_R2, ELLIPSE],
		[BTN, 118, 36, 7, 7, 1, 1, M_L2, ELLIPSE],
	]),
	DANCEPAD_A: map([
		[DIR, 39, 29, 54, 44, 1, 1, M_LEFT, SQUARE],
		[DIR, 56, 46, 71, 61, 1, 1, M_DOWN, SQUARE],
		[DIR, 56, 12, 71, 27, 1, 1, M_UP, SQUARE],
		[DIR, 73, 29, 88, 44, 1, 1, M_RIGHT, SQUARE],
	]),
	DANCEPAD_B: map([
		[BTN, 39, 12, 54, 27, 1, 1, M_B2, SQUARE],
		[BTN, 39, 46, 54, 61, 1, 1, M_B4, SQUARE],
		[BTN, 73, 12, 88, 27, 1, 1, M_B1, SQUARE],
		[BTN, 73, 46, 88, 61, 1, 1, M_B3, SQUARE],
	]),
	DANCEPAD_DDR_LEFT: map([
		[DIR, 9, 29, 24, 44, 1, 1, M_LEFT, SQUARE],
		[DIR, 26, 46, 41, 61, 1, 1, M_DOWN, SQUARE],
		[DIR, 26, 12, 41, 27, 1, 1, M_UP, SQUARE],
		[DIR, 43, 29, 58, 44, 1, 1, M_RIGHT, SQUARE],
	]),
	DANCEPAD_DDR_SOLO: map([
		[BTN, 39, 12, 54, 27, 1, 1, M_B2, SQUARE],
		[DIR, 39, 29, 54, 44, 1, 1, M_LEFT, SQUARE],
		[DIR, 56, 46, 71, 61, 1, 1, M_DOWN, SQUARE],
		[DIR, 56, 12, 71, 27, 1, 1, M_UP, SQUARE],
		[DIR, 73, 29, 88, 44, 1, 1, M_RIGHT, SQUARE],
		[BTN, 73, 12, 88, 27, 1, 1, M_B1, SQUARE],
	]),
	DANCEPAD_PIU_LEFT: map([
		[BTN, 39, 12, 54, 27, 1, 1, M_L1, SQUARE],
		[BTN, 39, 46, 54, 61, 1, 1, M_L2, SQUARE],
		[BTN, 73, 12, 88, 27, 1, 1, M_R1, SQUARE],
		[BTN, 73, 46, 88, 61, 1, 1, M_R2, SQUARE],
		[BTN, 56, 29, 71, 44, 1, 1, M_B1, SQUARE],
	]),
	POPN_A: map([
		[BTN, 14, 50, 8, 8, 1, 1, M_B4, ELLIPSE],
		[BTN, 26, 35, 8, 8, 1, 1, M_B2, ELLIPSE],
		[BTN, 39, 50, 8, 8, 1, 1, M_R1, ELLIPSE],
		[BTN, 52, 35, 8, 8, 1, 1, M_B1, ELLIPSE],
	]),
	TAIKO_A: map([
		[BTN, 60, 32, 22, 22, 1, 2, M_B3, ARC, 90, 270, 1],
		[BTN, 60, 32, 18, 18, 1, 1, M_B1, ARC, 90, 270, 1],
	]),
	BM_TURNTABLE_A: map([
		[SHAPE, 29, 34, 18, 18, 1, 0, 0, ELLIPSE],
		[SHAPE, 29, 34, 2, 2, 1, 0, 0, ELLIPSE],
		[DIR, 19, 31, 4, 3, 1, 1, M_UP, POLYGON, 13],
		[DIR, 19, 37, 4, 3, 1, 1, M_DOWN, POLYGON, 10],
		[DIR, 37, 31, 4, 3, 1, 1, M_DOWN, POLYGON, 13],
		[DIR, 37, 37, 4, 3, 1, 1, M_UP, POLYGON, 10],
	]),
	BM_5KEY_A: map([
		[BTN, 7, 37, 19, 56, 1, 1, M_B3, SQUARE],
		[BTN, 15, 13, 27, 32, 1, 1, M_L1, SQUARE],
		[BTN, 24, 37, 36, 56, 1, 1, M_B1, SQUARE],
		[BTN, 33, 13, 44, 32, 1, 1, M_R1, SQUARE],
		[BTN, 41, 37, 53, 56, 1, 1, M_B2, SQUARE],
	]),
	BM_7KEY_A: map([
		[BTN, 7, 37, 19, 56, 1, 1, M_B3, SQUARE],
		[BTN, 15, 13, 27, 32, 1, 1, M_L1, SQUARE],
		[BTN, 24, 37, 36, 56, 1, 1, M_B1, SQUARE],
		[BTN, 33, 13, 44, 32, 1, 1, M_R1, SQUARE],
		[BTN, 41, 37, 53, 56, 1, 1, M_B2, SQUARE],
		[BTN, 50, 13, 62, 32, 1, 1, M_R2, SQUARE],
		[DIR, 58, 37, 70, 56, 1, 1, M_RIGHT, SQUARE],
	]),
	GITADORA_FRET_A: map([
		[BTN, 6, 26, 19, 44, 1, 1, M_B2, SQUARE, 0, 0, 0],
		[BTN, 12, 26, 7, 7, 1, 1, M_B2, ARC, 180, 360, 0],
		[BTN, 25, 26, 38, 44, 1, 1, M_B4, SQUARE, 0, 0, 0],
		[BTN, 31, 26, 7, 7, 1, 1, M_B4, ARC, 180, 360, 0],
		[BTN, 44, 26, 57, 44, 1, 1, M_B1, SQUARE, 0, 0, 0],
		[BTN, 50, 26, 7, 7, 1, 1, M_B1, ARC, 180, 360, 0],
	]),
	GITADORA_STRUM_A: map([
		[DIR, 18, 26, 52, 30, 1, 1, M_DOWN, SQUARE, 0, 0, 0],
		[DIR, 18, 32, 52, 36, 1, 1, M_UP, SQUARE, 0, 0, 0],
	]),
	BANDHERO_FRET_A: map([
		[BTN, 5, 26, 14, 36, 1, 1, M_B2, SQUARE, 0, 0, 0],
		[BTN, 18, 26, 27, 36, 1, 1, M_B1, SQUARE, 0, 0, 0],
		[BTN, 31, 26, 40, 36, 1, 1, M_B4, SQUARE, 0, 0, 0],
		[BTN, 44, 26, 53, 36, 1, 1, M_B3, SQUARE, 0, 0, 0],
		[BTN, 57, 26, 66, 36, 1, 1, M_L2, SQUARE, 0, 0, 0],
	]),
	BANDHERO_STRUM_A: map([
		[DIR, 21, 27, 45, 30, 1, 1, M_DOWN, SQUARE, 0, 0, 0],
		[DIR, 21, 32, 45, 35, 1, 1, M_UP, SQUARE, 0, 0, 0],
		[LEVER, 54, 16, 5, 5, 1, 0, 0, 0],
		[BTN, 14, 44, 4, 4, 1, 1, M_S1, ELLIPSE],
		[BTN, 6, 50, 4, 4, 1, 1, M_S2, ELLIPSE],
	]),
	DANCEPAD_DDR_RIGHT: map([
		[BTN, 69, 29, 84, 44, 1, 1, M_B3, SQUARE],
		[BTN, 86, 46, 101, 61, 1, 1, M_B1, SQUARE],
		[BTN, 86, 12, 101, 27, 1, 1, M_B4, SQUARE],
		[BTN, 103, 29, 118, 44, 1, 1, M_B2, SQUARE],
	]),
	DANCEPAD_PIU_RIGHT: map([
		[BTN, 39, 12, 54, 27, 1, 1, M_L1, SQUARE],
		[BTN, 39, 46, 54, 61, 1, 1, M_L2, SQUARE],
		[BTN, 73, 12, 88, 27, 1, 1, M_R1, SQUARE],
		[BTN, 73, 46, 88, 61, 1, 1, M_R2, SQUARE],
		[BTN, 56, 29, 71, 44, 1, 1, M_B1, SQUARE],
	]),
	POPN_B: map([
		[BTN, 66, 50, 8, 8, 1, 1, M_L1, ELLIPSE],
		[BTN, 77, 35, 8, 8, 1, 1, M_B3, ELLIPSE],
		[BTN, 90, 50, 8, 8, 1, 1, M_R2, ELLIPSE],
		[DIR, 104, 35, 8, 8, 1, 1, M_UP, ELLIPSE],
		[BTN, 116, 50, 8, 8, 1, 1, M_L2, ELLIPSE],
	]),
	TAIKO_B: map([
		[BTN, 68, 32, 22, 22, 1, 2, M_B4, ARC, 270, 450, 1],
		[BTN, 68, 32, 18, 18, 1, 1, M_B2, ARC, 270, 450, 1],
	]),
	BM_TURNTABLE_B: map([
		[SHAPE, 102, 34, 18, 18, 1, 0, 0, ELLIPSE],
		[SHAPE, 102, 34, 2, 2, 1, 0, 0, ELLIPSE],
		[DIR, 92, 31, 4, 3, 1, 1, M_UP, POLYGON, 13],
		[DIR, 92, 37, 4, 3, 1, 1, M_DOWN, POLYGON, 10],
		[DIR, 110, 31, 4, 3, 1, 1, M_DOWN, POLYGON, 13],
		[DIR, 110, 37, 4, 3, 1, 1, M_UP, POLYGON, 10],
	]),
	BM_5KEY_B: map([
		[BTN, 57, 37, 69, 56, 1, 1, M_B3, SQUARE],
		[BTN, 65, 13, 77, 32, 1, 1, M_L1, SQUARE],
		[BTN, 74, 37, 86, 56, 1, 1, M_B1, SQUARE],
		[BTN, 82, 13, 94, 32, 1, 1, M_R1, SQUARE],
		[BTN, 91, 37, 103, 56, 1, 1, M_B2, SQUARE],
	]),
	BM_7KEY_B: map([
		[BTN, 57, 37, 69, 56, 1, 1, M_B3, SQUARE],
		[BTN, 65, 13, 77, 32, 1, 1, M_L1, SQUARE],
		[BTN, 74, 37, 86, 56, 1, 1, M_B1, SQUARE],
		[BTN, 82, 13, 94, 32, 1, 1, M_R1, SQUARE],
		[BTN, 91, 37, 103, 56, 1, 1, M_B2, SQUARE],
		[BTN, 100, 13, 112, 32, 1, 1, M_R2, SQUARE],
		[DIR, 108, 37, 120, 56, 1, 1, M_RIGHT, SQUARE],
	]),
	GITADORA_FRET_B: map([
		[BTN, 108, 26, 121, 44, 1, 1, M_B2, SQUARE, 0, 0, 0],
		[BTN, 114, 26, 7, 7, 1, 1, M_B2, ARC, 180, 360, 0],
		[BTN, 89, 26, 102, 44, 1, 1, M_B4, SQUARE, 0, 0, 0],
		[BTN, 95, 26, 7, 7, 1, 1, M_B4, ARC, 180, 360, 0],
		[BTN, 70, 26, 83, 44, 1, 1, M_B1, SQUARE, 0, 0, 0],
		[BTN, 76, 26, 7, 7, 1, 1, M_B1, ARC, 180, 360, 0],
	]),
	GITADORA_STRUM_B: map([
		[DIR, 75, 26, 109, 30, 1, 1, M_DOWN, SQUARE, 0, 0, 0],
		[DIR, 75, 32, 109, 36, 1, 1, M_UP, SQUARE, 0, 0, 0],
	]),
	BANDHERO_FRET_B: map([
		[BTN, 113, 26, 122, 36, 1, 1, M_B2, SQUARE, 0, 0, 0],
		[BTN, 100, 26, 109, 36, 1, 1, M_B1, SQUARE, 0, 0, 0],
		[BTN, 87, 26, 96, 36, 1, 1, M_B4, SQUARE, 0, 0, 0],
		[BTN, 74, 26, 83, 36, 1, 1, M_B3, SQUARE, 0, 0, 0],
		[BTN, 61, 26, 70, 36, 1, 1, M_L2, SQUARE, 0, 0, 0],
	]),
	BANDHERO_STRUM_B: map([
		[DIR, 75, 26, 109, 30, 1, 1, M_DOWN, SQUARE, 0, 0, 0],
		[DIR, 75, 32, 109, 36, 1, 1, M_UP, SQUARE, 0, 0, 0],
		[LEVER, 72, 16, 5, 5, 1, 0, 0, 0],
		[BTN, 113, 44, 4, 4, 1, 1, M_S1, ELLIPSE],
		[BTN, 120, 50, 4, 4, 1, 1, M_S2, ELLIPSE],
	]),
	_6GAWD_A: map([[LEVER, 22, 30, 10, 10, 1, 0, 0]]),
	_6GAWD_B: map([
		[BTN, 69, 25, 6, 6, 1, 1, M_B3, ELLIPSE],
		[BTN, 81, 16, 6, 6, 1, 1, M_B4, ELLIPSE],
		[BTN, 95, 16, 6, 6, 1, 1, M_R1, ELLIPSE],
		[BTN, 109, 24, 7, 7, 1, 1, M_L1, ELLIPSE],
		[BTN, 69, 43, 6, 6, 1, 1, M_B1, ELLIPSE],
		[BTN, 81, 34, 6, 6, 1, 1, M_B2, ELLIPSE],
		[BTN, 95, 34, 6, 6, 1, 1, M_R2, ELLIPSE],
		[BTN, 58, 53, 7, 7, 1, 1, M_L2, ELLIPSE],
	]),
	_6GAWD_ALLBUTTON_A: map([
		[DIR, 22, 28, 6, 6, 1, 1, M_LEFT, ELLIPSE],
		[DIR, 40, 28, 6, 6, 1, 1, M_DOWN, ELLIPSE],
		[DIR, 56, 32, 6, 6, 1, 1, M_RIGHT, ELLIPSE],
		[DIR, 58, 53, 7, 7, 1, 1, M_UP, ELLIPSE],
	]),
	_6GAWD_ALLBUTTON_B: map([
		[BTN, 69, 25, 6, 6, 1, 1, M_B3, ELLIPSE],
		[BTN, 81, 16, 6, 6, 1, 1, M_B4, ELLIPSE],
		[BTN, 95, 16, 6, 6, 1, 1, M_R1, ELLIPSE],
		[BTN, 109, 24, 7, 7, 1, 1, M_L1, ELLIPSE],
		[BTN, 69, 43, 6, 6, 1, 1, M_B1, ELLIPSE],
		[BTN, 81, 34, 6, 6, 1, 1, M_B2, ELLIPSE],
		[BTN, 95, 34, 6, 6, 1, 1, M_R2, ELLIPSE],
		[BTN, 80, 53, 7, 7, 1, 1, M_L2, ELLIPSE],
	]),
	_6GAWD_ALLBUTTONPLUS_A: map([
		[BTN, 12, 32, 6, 6, 1, 1, M_L2, ELLIPSE],
		[DIR, 26, 28, 6, 6, 1, 1, M_LEFT, ELLIPSE],
		[DIR, 40, 28, 6, 6, 1, 1, M_DOWN, ELLIPSE],
		[DIR, 54, 33, 6, 6, 1, 1, M_RIGHT, ELLIPSE],
		[DIR, 58, 53, 7, 7, 1, 1, M_UP, ELLIPSE],
	]),
	_6GAWD_ALLBUTTONPLUS_B: map([
		[BTN, 69, 25, 6, 6, 1, 1, M_B3, ELLIPSE],
		[BTN, 81, 16, 6, 6, 1, 1, M_B4, ELLIPSE],
		[BTN, 95, 16, 6, 6, 1, 1, M_R1, ELLIPSE],
		[BTN, 109, 24, 7, 7, 1, 1, M_L1, ELLIPSE],
		[BTN, 69, 43, 6, 6, 1, 1, M_B1, ELLIPSE],
		[BTN, 81, 34, 6, 6, 1, 1, M_B2, ELLIPSE],
		[BTN, 95, 34, 6, 6, 1, 1, M_R2, ELLIPSE],
	]),
};

// ButtonLayout enum → layout group key (proto/enums.proto:5-43)
const LEFT_LAYOUT_MAP: Record<number, string> = {
	0: 'ARCADE_STICK',
	1: 'STICKLESS',
	2: 'UDLR',
	3: 'MAME_A',
	4: 'KEYBOARD_ANGLED',
	5: 'WASD_BOX',
	6: 'DANCEPAD_A',
	7: 'TWINSTICK_A',
	8: '', // BLANKA
	9: 'VLXA',
	10: 'FIGHTBOARD_STICK',
	11: 'FIGHTBOARD_MIRRORED',
	12: 'CUSTOM_A',
	13: 'OPEN_CORE_WASD_A',
	14: 'STICKLESS13A',
	15: 'STICKLESS16A',
	16: 'STICKLESS14A',
	17: 'DANCEPAD_DDR_LEFT',
	18: 'DANCEPAD_DDR_SOLO',
	19: 'DANCEPAD_PIU_LEFT',
	20: 'POPN_A',
	21: 'TAIKO_A',
	22: 'BM_TURNTABLE_A',
	23: 'BM_5KEY_A',
	24: 'BM_7KEY_A',
	25: 'GITADORA_FRET_A',
	26: 'GITADORA_STRUM_A',
	27: 'BOARD_DEFINED_A',
	28: 'BANDHERO_FRET_A',
	29: 'BANDHERO_STRUM_A',
	30: '_6GAWD_A',
	31: '_6GAWD_ALLBUTTON_A',
	32: '_6GAWD_ALLBUTTONPLUS_A',
	33: 'STICKLESSR16A',
};

// ButtonLayoutRight enum → layout group key (proto/enums.proto:45-89)
const RIGHT_LAYOUT_MAP: Record<number, string> = {
	0: 'ARCADE_BUTTONS',
	1: 'STICKLESS_BUTTONS',
	2: 'WASD_BUTTONS',
	3: 'VEWLIX',
	4: 'VEWLIX7',
	5: 'CAPCOM',
	6: 'CAPCOM6',
	7: 'SEGA_2P',
	8: 'NOIR8',
	9: 'MAME_B',
	10: 'DANCEPAD_B',
	11: 'TWINSTICK_B',
	12: '', // BLANKB
	13: 'VLXB',
	14: 'FIGHTBOARD',
	15: 'FIGHTBOARD_STICK_MIRRORED',
	16: 'CUSTOM_B',
	17: 'MAME_8B',
	18: 'OPEN_CORE_WASD_B',
	19: 'STICKLESS_BUTTONS13B',
	20: 'STICKLESS_BUTTONS16B',
	21: 'STICKLESS_BUTTONS14B',
	22: 'DANCEPAD_DDR_RIGHT',
	23: 'DANCEPAD_PIU_RIGHT',
	24: 'POPN_B',
	25: 'TAIKO_B',
	26: 'BM_TURNTABLE_B',
	27: 'BM_5KEY_B',
	28: 'BM_7KEY_B',
	29: 'GITADORA_FRET_B',
	30: 'GITADORA_STRUM_B',
	31: 'BOARD_DEFINED_B',
	32: 'BANDHERO_FRET_B',
	33: 'BANDHERO_STRUM_B',
	34: '_6GAWD_B',
	35: '_6GAWD_ALLBUTTON_B',
	36: '_6GAWD_ALLBUTTONPLUS_B',
	37: 'STICKLESS_BUTTONSR16B',
	38: 'VLXB_6B',
	39: 'SEGA_2P_6B',
};

export function getLeftLayout(index: number): GPButtonLayout[] {
	const key = LEFT_LAYOUT_MAP[index];
	if (!key) return [];
	const base = LAYOUTS[key];
	return base ? base.map(cloneElement) : [];
}

export function getRightLayout(index: number): GPButtonLayout[] {
	const key = RIGHT_LAYOUT_MAP[index];
	if (!key) return [];
	const base = LAYOUTS[key];
	return base ? base.map(cloneElement) : [];
}

function cloneElement(e: GPButtonLayout): GPButtonLayout {
	return {
		elementType: e.elementType,
		parameters: { ...e.parameters },
	};
}

export type CustomParams = {
	layout: number;
	startX: number;
	startY: number;
	buttonRadius: number;
	buttonPadding: number;
};

export function getLayoutA(
	buttonLayout: number,
	buttonLayoutRight: number,
	orientation: number,
	customLeft?: CustomParams,
	customRight?: CustomParams,
	boardLayoutA?: GPButtonLayout[],
	boardLayoutB?: GPButtonLayout[],
): GPButtonLayout[] {
	if (orientation !== 0) {
		const right = getCustomRightLayout(buttonLayoutRight, customRight, boardLayoutB);
		if (orientation === 2) {
			return adjustByOffset(right, -64, 0);
		}
		return adjustByOffset(flipHorizontally(right, 64, 128), -64, 0);
	}
	return getCustomLeftLayout(buttonLayout, customLeft, boardLayoutA);
}

export function getLayoutB(
	buttonLayout: number,
	buttonLayoutRight: number,
	orientation: number,
	customLeft?: CustomParams,
	customRight?: CustomParams,
	boardLayoutA?: GPButtonLayout[],
	boardLayoutB?: GPButtonLayout[],
): GPButtonLayout[] {
	if (orientation !== 0) {
		const left = getCustomLeftLayout(buttonLayout, customLeft, boardLayoutA);
		if (orientation === 2) {
			return adjustByOffset(left, 64, 0);
		}
		return adjustByOffset(flipHorizontally(left, 0, 64), 64, 0);
	}
	return getCustomRightLayout(buttonLayoutRight, customRight, boardLayoutB);
}

export function getCustomLeftLayout(
	index: number,
	custom?: CustomParams,
	boardLayoutA?: GPButtonLayout[],
): GPButtonLayout[] {
	if (index === 27) {
		return boardLayoutA ? boardLayoutA.map(cloneElement) : [];
	}
	if (index !== 12 || !custom) return getLeftLayout(index);
	const base = getLeftLayout(custom.layout);
	return adjustByCustomSettings(base, custom, 0, 0);
}

export function getCustomRightLayout(
	index: number,
	custom?: CustomParams,
	boardLayoutB?: GPButtonLayout[],
): GPButtonLayout[] {
	if (index === 31) {
		return boardLayoutB ? boardLayoutB.map(cloneElement) : [];
	}
	if (index !== 16 || !custom) return getRightLayout(index);
	const base = getRightLayout(custom.layout);
	return adjustByCustomSettings(base, custom, 64, 0);
}

export function adjustByCustomSettings(
	layout: GPButtonLayout[],
	common: CustomParams,
	originX: number,
	originY: number,
): GPButtonLayout[] {
	const result = layout.map(cloneElement);
	if (result.length === 0) return result;
	const startX = result[0].parameters.x1;
	const startY = result[0].parameters.y1;
	const offsetX = common.startX - startX;
	const offsetY = common.startY - startY;
	for (const element of result) {
		if (element.elementType === 2) {
			element.parameters.x1 += originX + (offsetX + common.buttonPadding);
			element.parameters.y1 += originY + (offsetY + common.buttonPadding);
		} else {
			element.parameters.x1 += originX + offsetX;
			element.parameters.y1 += originY + offsetY;
		}
		if (
			element.parameters.shape === GP_SHAPE.ELLIPSE ||
			element.parameters.shape === GP_SHAPE.POLYGON
		) {
			element.parameters.x2 = common.buttonRadius;
			element.parameters.y2 = common.buttonRadius;
		}
	}
	return result;
}

export function adjustByOffset(
	layout: GPButtonLayout[],
	originX: number,
	originY: number,
): GPButtonLayout[] {
	const result = layout.map(cloneElement);
	if (result.length === 0) return result;
	let minX = Number.MAX_SAFE_INTEGER;
	let maxX = Number.MIN_SAFE_INTEGER;
	for (const element of result) {
		let newX = element.parameters.x1 + originX;
		if (
			element.parameters.shape === GP_SHAPE.ELLIPSE ||
			element.parameters.shape === GP_SHAPE.POLYGON
		) {
			newX = element.parameters.x1 - element.parameters.x2 + originX;
		} else if (element.parameters.shape === GP_SHAPE.SQUARE && originX > 0) {
			newX = element.parameters.x2 + originX;
		}
		if (newX < minX) minX = newX;
		if (newX > maxX) maxX = newX;
	}
	let offsetX = 0;
	if (minX < 0) {
		offsetX = -minX;
	} else if (maxX > 127) {
		offsetX = 127 - maxX;
	}
	for (const element of result) {
		element.parameters.x1 += originX + offsetX;
		if (element.parameters.shape === GP_SHAPE.SQUARE) {
			element.parameters.x2 += originX + offsetX;
		}
		element.parameters.y1 += originY;
	}
	return result;
}

export function flipHorizontally(
	layout: GPButtonLayout[],
	startX: number,
	endX: number,
): GPButtonLayout[] {
	const result = layout.map(cloneElement);
	for (const element of result) {
		const originalX = element.parameters.x1;
		element.parameters.x1 = endX - 1 - (originalX - startX);
	}
	return result;
}
