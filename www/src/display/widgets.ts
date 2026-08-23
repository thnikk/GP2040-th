import { GFX } from './gfx';
import {
	GPButtonLayout,
	GPViewport,
	GP_SHAPE,
	GP_ELEMENT,
	GAMEPAD_MASK,
} from './types';

export type WidgetContext = {
	gfx: GFX;
	viewport: GPViewport;
	width: number;
	height: number;
	buttons: number;
	dpad: number;
	heldPins: number[];
};

export type WidgetScale = {
	scaleX: number;
	scaleY: number;
	offsetX: number;
	offsetY: number;
};

export function computeScale(
	viewport: GPViewport,
	width: number,
	height: number,
): WidgetScale {
	let scaleX = (viewport.right - viewport.left) / width;
	let scaleY = (viewport.bottom - viewport.top) / height;
	if (scaleX > 0 && (scaleY === 0 || scaleY === 1)) {
		scaleY = scaleX;
	} else if ((scaleX === 0 || scaleX === 1) && scaleY > 0) {
		scaleX = scaleY;
	}
	const offsetX = Math.trunc(
		(width - (viewport.right - viewport.left) * scaleX) / 2,
	);
	const offsetY = Math.trunc(
		(height - (viewport.bottom - viewport.top) * scaleY) / 2,
	);
	return { scaleX, scaleY, offsetX, offsetY };
}

export function computeBase(
	x: number,
	y: number,
	viewport: GPViewport,
	scale: WidgetScale,
) {
	let baseX = x;
	let baseY = y;
	if (scale.scaleX > 0) {
		baseX = x * scale.scaleX + viewport.left + scale.offsetX;
	}
	if (scale.scaleY > 0) {
		baseY = y * scale.scaleY + viewport.top;
	}
	return { baseX, baseY };
}

function isPressed(
	elementType: number,
	mask: number,
	ctx: WidgetContext,
): boolean {
	if (elementType === GP_ELEMENT.DIR_BUTTON) {
		return (ctx.dpad & mask) === mask;
	}
	if (elementType === GP_ELEMENT.BTN_BUTTON) {
		return (ctx.buttons & mask) === mask;
	}
	if (elementType === GP_ELEMENT.PIN_BUTTON) {
		return ctx.heldPins.includes(mask);
	}
	return false;
}

export function drawWidget(element: GPButtonLayout, ctx: WidgetContext): void {
	const { gfx, viewport, width, height } = ctx;
	const scale = computeScale(viewport, width, height);
	const p = element.parameters;

	if (element.elementType === GP_ELEMENT.LEVER) {
		drawLever(gfx, viewport, width, p.x1, p.y1, p.x2, p.value, ctx.dpad, scale);
		return;
	}

	if (element.elementType === GP_ELEMENT.SHAPE) {
		drawShape(gfx, viewport, p, scale);
		return;
	}

	if (element.elementType === GP_ELEMENT.SPRITE) {
		return;
	}

	const { baseX, baseY } = computeBase(p.x1, p.y1, viewport, scale);
	const state = isPressed(element.elementType, p.value, ctx) ? 1 : 0;

	switch (p.shape) {
		case GP_SHAPE.ELLIPSE: {
			const baseRadius = Math.trunc(p.x2 * scale.scaleX);
			gfx.drawEllipse(baseX, baseY, baseRadius, baseRadius, p.stroke, state);
			break;
		}
		case GP_SHAPE.SQUARE: {
			const sizeX = p.x2 * scale.scaleX + viewport.left;
			const sizeY = p.y2 * scale.scaleY + viewport.top;
			gfx.drawRectangle(
				baseX,
				baseY,
				sizeX + scale.offsetX,
				sizeY,
				p.stroke,
				state,
				p.angleStart,
			);
			break;
		}
		case GP_SHAPE.LINE: {
			gfx.drawLine(baseX, baseY, p.x2, p.y2, p.stroke);
			break;
		}
		case GP_SHAPE.POLYGON: {
			const baseRadius = Math.trunc(p.x2 * scale.scaleX);
			gfx.drawPolygon(
				baseX,
				baseY,
				baseRadius,
				p.y2,
				p.stroke,
				state,
				p.angleStart,
			);
			break;
		}
		case GP_SHAPE.ARC: {
			const baseRadius = Math.trunc(p.x2 * scale.scaleX);
			gfx.drawArc(
				baseX,
				baseY,
				baseRadius,
				baseRadius,
				p.stroke,
				state,
				p.angleStart,
				p.angleEnd,
				p.closed,
			);
			break;
		}
	}
}

function drawShape(
	gfx: GFX,
	viewport: GPViewport,
	p: GPButtonLayout['parameters'],
	scale: WidgetScale,
) {
	const { baseX, baseY } = computeBase(p.x1, p.y1, viewport, scale);
	switch (p.shape) {
		case GP_SHAPE.ELLIPSE: {
			const baseRadius = Math.trunc(p.x2 * scale.scaleX);
			gfx.drawEllipse(baseX, baseY, baseRadius, baseRadius, p.stroke, p.fill);
			break;
		}
		case GP_SHAPE.SQUARE: {
			const sizeX = p.x2 * scale.scaleX + viewport.left;
			const sizeY = p.y2 * scale.scaleY + viewport.top;
			gfx.drawRectangle(
				baseX,
				baseY,
				sizeX + scale.offsetX,
				sizeY,
				p.stroke,
				p.fill,
				p.angleStart,
			);
			break;
		}
		case GP_SHAPE.LINE: {
			gfx.drawLine(baseX, baseY, p.x2, p.y2, p.stroke);
			break;
		}
		case GP_SHAPE.POLYGON: {
			const baseRadius = Math.trunc(p.x2 * scale.scaleX);
			gfx.drawPolygon(
				baseX,
				baseY,
				baseRadius,
				p.y2,
				p.stroke,
				p.fill,
				p.angleStart,
			);
			break;
		}
		case GP_SHAPE.ARC: {
			const baseRadius = Math.trunc(p.x2 * scale.scaleX);
			gfx.drawArc(
				baseX,
				baseY,
				baseRadius,
				baseRadius,
				p.stroke,
				p.fill,
				p.angleStart,
				p.angleEnd,
				p.closed,
			);
			break;
		}
	}
}

function drawLever(
	gfx: GFX,
	viewport: GPViewport,
	width: number,
	x: number,
	y: number,
	radius: number,
	inputType: number,
	dpad: number,
	scale: WidgetScale,
) {
	let baseX = x;
	let baseY = y;
	let leverX = x;
	let leverY = y;
	const offsetX = Math.trunc((width - width * scale.scaleX) / 2);
	if (scale.scaleX > 0) {
		baseX = x * scale.scaleX + viewport.left + offsetX;
		leverX = baseX;
	}
	if (scale.scaleY > 0) {
		baseY = y * scale.scaleY + viewport.top;
		leverY = baseY;
	}

	const baseRadius = Math.trunc(radius * scale.scaleX);
	const leverRadius = Math.trunc(radius * 0.75 * scale.scaleY);

	if (inputType === 0) {
		const up = (dpad & GAMEPAD_MASK.UP) === GAMEPAD_MASK.UP;
		const down = (dpad & GAMEPAD_MASK.DOWN) === GAMEPAD_MASK.DOWN;
		const left = (dpad & GAMEPAD_MASK.LEFT) === GAMEPAD_MASK.LEFT;
		const right = (dpad & GAMEPAD_MASK.RIGHT) === GAMEPAD_MASK.RIGHT;
		if (up !== down) {
			leverY -= up ? leverRadius : -leverRadius;
		}
		if (left !== right) {
			leverX -= left ? leverRadius : -leverRadius;
		}
	}

	gfx.drawEllipse(baseX, baseY, baseRadius, baseRadius, 1, 0);
	gfx.drawEllipse(leverX, leverY, leverRadius, leverRadius, 1, 1);
}
