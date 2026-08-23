import { GPButtonLayout } from './types'

const PIN_BUTTON = 4
const ELLIPSE = 0

function pb(
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	value: number,
): GPButtonLayout {
	return {
		elementType: PIN_BUTTON,
		parameters: {
			x1,
			y1,
			x2,
			y2,
			stroke: 1,
			fill: 1,
			value,
			shape: ELLIPSE,
			angleStart: 0,
			angleEnd: 0,
			closed: 0,
		},
	}
}

// Transcribed from configs/<Board>/BoardConfig.h DEFAULT_BOARD_LAYOUT_A/B.
// Keyed by lowercased config dir name (matches VITE_GP2040_BOARD).
export const BOARD_LAYOUTS: Record<
	string,
	{ layoutA: GPButtonLayout[]; layoutB: GPButtonLayout[] }
> = {
	'fightboard-v3': {
		layoutA: [
			pb(22, 23, 8, 8, 29),
			pb(0, 39, 8, 8, 28),
			pb(19, 42, 8, 8, 27),
			pb(38, 45, 8, 8, 26),
		],
		layoutB: [
			pb(70, 25, 8, 8, 1),
			pb(70, 45, 8, 8, 5),
			pb(90, 15, 8, 8, 2),
			pb(90, 35, 8, 8, 6),
			pb(110, 15, 8, 8, 3),
			pb(110, 35, 8, 8, 7),
			pb(130, 15, 8, 8, 4),
			pb(130, 35, 8, 8, 8),
			pb(86, 50, 4, 4, 9),
			pb(98, 50, 4, 4, 10),
			pb(110, 50, 4, 4, 11),
			pb(122, 50, 4, 4, 12),
			pb(134, 50, 4, 4, 13),
		],
	},
	'fightboard-v3-m': {
		layoutA: [
			pb(60, 25, 8, 8, 15),
			pb(60, 45, 8, 8, 9),
			pb(40, 15, 8, 8, 28),
			pb(40, 35, 8, 8, 12),
			pb(20, 15, 8, 8, 27),
			pb(20, 35, 8, 8, 13),
			pb(0, 15, 8, 8, 26),
			pb(0, 35, 8, 8, 14),
			pb(0, 50, 4, 4, 8),
			pb(10, 50, 4, 4, 7),
			pb(20, 50, 4, 4, 6),
			pb(30, 50, 4, 4, 5),
			pb(40, 50, 4, 4, 4),
		],
		layoutB: [
			pb(108, 23, 8, 8, 0),
			pb(92, 45, 8, 8, 1),
			pb(111, 42, 8, 8, 2),
			pb(130, 39, 8, 8, 3),
		],
	},
	springboard: {
		layoutA: [
			pb(7, 20, 8, 8, 27),
			pb(26, 23, 8, 8, 28),
			pb(44, 26, 8, 8, 29),
			pb(4, 39, 8, 8, 14),
			pb(23, 42, 8, 8, 15),
			pb(42, 45, 8, 8, 26),
			pb(0, 54, 4, 4, 12),
			pb(11, 54, 4, 4, 13),
		],
		layoutB: [
			pb(77, 12, 4, 4, 1),
			pb(82, 26, 8, 8, 2),
			pb(100, 23, 8, 8, 3),
			pb(119, 20, 8, 8, 4),
			pb(85, 45, 8, 8, 5),
			pb(103, 42, 8, 8, 6),
			pb(122, 39, 8, 8, 7),
			pb(117, 54, 4, 4, 8),
			pb(127, 54, 4, 4, 9),
		],
	},
}