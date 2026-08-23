import { GP_FONT_STANDARD } from './font';
import {
	SCREEN_WIDTH,
	SCREEN_HEIGHT,
	FONT_WIDTH,
	FONT_HEIGHT,
	FONT_CHAR_OFFSET,
	MAX_TEXT_CHARS,
} from './types';

const M_PI = Math.PI;

export class GFX {
	width: number;
	height: number;
	frameBuffer: Uint8Array;

	constructor(width = SCREEN_WIDTH, height = SCREEN_HEIGHT) {
		this.width = width;
		this.height = height;
		this.frameBuffer = new Uint8Array(width * height);
	}

	clearScreen() {
		this.frameBuffer.fill(0);
	}

	getPixel(x: number, y: number): number {
		const px = Math.trunc(x);
		const py = Math.trunc(y);
		if (px < 0 || px >= this.width || py < 0 || py >= this.height) return 0;
		return this.frameBuffer[py * this.width + px];
	}

	drawPixel(x: number, y: number, color: number) {
		const px = Math.trunc(x);
		const py = Math.trunc(y);
		if (px < 0 || px >= this.width || py < 0 || py >= this.height) return;
		const idx = py * this.width + px;
		if (color === 1) {
			this.frameBuffer[idx] = 1;
		} else if (color === 0) {
			this.frameBuffer[idx] = 0;
		} else {
			this.frameBuffer[idx] ^= 1;
		}
	}

	drawText(x: number, y: number, text: string, invert = 0) {
		const glyphPitch = (FONT_WIDTH - 1) * (FONT_HEIGHT / 8);
		let charOffset = 0;
		const maxLen = Math.min(text.length, MAX_TEXT_CHARS);
		for (let charIndex = 0; charIndex < maxLen; charIndex++) {
			const currChar = text.charCodeAt(charIndex);
			const glyphIndex = currChar - FONT_CHAR_OFFSET;
			if (glyphIndex < 0) continue;
			const glyphOffset = glyphIndex * glyphPitch;
			for (let spriteY = 0; spriteY < FONT_HEIGHT; spriteY++) {
				for (let spriteX = 0; spriteX < FONT_WIDTH - 1; spriteX++) {
					const spriteByte = GP_FONT_STANDARD[glyphOffset + spriteX];
					let color = (spriteByte >> spriteY % 8) & 0x01;
					if (invert) color = color ? 0 : 1;
					this.drawPixel(
						x * FONT_WIDTH + spriteX + charOffset,
						y * FONT_HEIGHT + spriteY,
						color,
					);
				}
			}
			charOffset += FONT_WIDTH;
		}
	}

	drawLine(x1: number, y1: number, x2: number, y2: number, color: number) {
		let ax = x1;
		let ay = y1;
		const dx = Math.abs(x2 - x1);
		const dy = Math.abs(y2 - y1);
		const stepX = x1 < x2 ? 1 : -1;
		const stepY = y1 < y2 ? 1 : -1;
		let err = dx - dy;
		// eslint-disable-next-line no-constant-condition
		while (true) {
			this.drawPixel(ax, ay, color);
			if (ax === x2 && ay === y2) break;
			const errDouble = 2 * err;
			if (errDouble > -dy) {
				err -= dy;
				ax += stepX;
			}
			if (errDouble < dx) {
				err += dx;
				ay += stepY;
			}
		}
	}

	drawArc(
		x: number,
		y: number,
		radiusX: number,
		radiusY: number,
		color: number,
		filled: number,
		startAngleDeg: number,
		endAngleDeg: number,
		closed: number,
	) {
		const startAngle = (startAngleDeg * M_PI) / 180.0;
		const endAngle = (endAngleDeg * M_PI) / 180.0;
		const angleStep = 0.01;

		for (let angle = startAngle; angle < endAngle; angle += angleStep) {
			const xPos = x + Math.trunc(radiusX * Math.cos(angle));
			const yPos = y + Math.trunc(radiusY * Math.sin(angle));
			this.drawPixel(xPos, yPos, color);
		}
		this.drawPixel(
			x + Math.trunc(radiusX * Math.cos(endAngle)),
			y + Math.trunc(radiusY * Math.sin(endAngle)),
			color,
		);

		if (closed) {
			this.drawLine(
				x,
				y,
				x + Math.trunc(radiusX * Math.cos(startAngle)),
				y + Math.trunc(radiusY * Math.sin(startAngle)),
				color,
			);
			this.drawLine(
				x,
				y,
				x + Math.trunc(radiusX * Math.cos(endAngle)),
				y + Math.trunc(radiusY * Math.sin(endAngle)),
				color,
			);
		}

		if (filled) {
			for (let angle = startAngle; angle <= endAngle; angle += angleStep) {
				this.drawLine(
					x,
					y,
					x + Math.trunc(radiusX * Math.cos(angle)),
					y + Math.trunc(radiusY * Math.sin(angle)),
					color,
				);
			}
		}
	}

	drawEllipse(
		x: number,
		y: number,
		radiusX: number,
		radiusY: number,
		color: number,
		filled: number,
	) {
		let ex = -radiusX;
		let ey = 0;
		let e2 = radiusY;
		let dx = (1 + 2 * ex) * e2 * e2;
		let dy = ex * ex;
		let err = dx + dy;

		while (ex <= 0) {
			this.drawPixel(x - ex, y + ey, color);
			this.drawPixel(x + ex, y + ey, color);
			this.drawPixel(x + ex, y - ey, color);
			this.drawPixel(x - ex, y - ey, color);

			if (filled) {
				for (let i = 0; i < (x - ex - (x + ex)) / 2; i++) {
					this.drawPixel(x - i, y + ey, color);
					this.drawPixel(x + i, y + ey, color);
					this.drawPixel(x + i, y - ey, color);
					this.drawPixel(x - i, y - ey, color);
				}
			}

			e2 = 2 * err;
			if (e2 >= dx) {
				ex++;
				err += dx += 2 * radiusY * radiusY;
			}
			if (e2 <= dy) {
				ey++;
				err += dy += 2 * radiusX * radiusX;
			}
		}

		while (ey++ < radiusY) {
			this.drawPixel(x, y + ey, color);
			this.drawPixel(x, y - ey, color);
		}
	}

	drawRectangle(
		x: number,
		y: number,
		width: number,
		height: number,
		color: number,
		filled: number,
		rotationAngle = 0,
	) {
		const centerX = (x + width) / 2.0;
		const centerY = (y + height) / 2.0;
		const halfWidth = (width - x) / 2.0;
		const halfHeight = (height - y) / 2.0;
		const angleRad = (rotationAngle * M_PI) / 180.0;
		const cosA = Math.cos(angleRad);
		const sinA = Math.sin(angleRad);

		const x0 = Math.round(centerX + cosA * -halfWidth - sinA * -halfHeight);
		const y0 = Math.round(centerY + sinA * -halfWidth + cosA * -halfHeight);
		const x1 = Math.round(centerX + cosA * halfWidth - sinA * -halfHeight);
		const y1 = Math.round(centerY + sinA * halfWidth + cosA * -halfHeight);
		const x2 = Math.round(centerX + cosA * halfWidth - sinA * halfHeight);
		const y2 = Math.round(centerY + sinA * halfWidth + cosA * halfHeight);
		const x3 = Math.round(centerX + cosA * -halfWidth - sinA * halfHeight);
		const y3 = Math.round(centerY + sinA * -halfWidth + cosA * halfHeight);

		this.drawLine(x0, y0, x1, y1, color);
		this.drawLine(x1, y1, x2, y2, color);
		this.drawLine(x2, y2, x3, y3, color);
		this.drawLine(x3, y3, x0, y0, color);

		if (filled) {
			const numLines = Math.round(
				Math.sqrt(halfWidth * halfWidth + halfHeight * halfHeight) * 2,
			);
			for (let i = 0; i <= numLines; i++) {
				const t = i / numLines;
				const xStart = Math.round((1 - t) * x0 + t * x3);
				const yStart = Math.round((1 - t) * y0 + t * y3);
				const xEnd = Math.round((1 - t) * x1 + t * x2);
				const yEnd = Math.round((1 - t) * y1 + t * y2);
				this.drawLine(xStart, yStart, xEnd, yEnd, color);
			}
		}
	}

	drawPolygon(
		x: number,
		y: number,
		radius: number,
		sides: number,
		color: number,
		filled: number,
		rotation = 0,
	) {
		const angleIncrement = (2 * M_PI) / sides;
		const xVertices: number[] = [];
		const yVertices: number[] = [];
		for (let i = 0; i < sides; i++) {
			const angle = i * angleIncrement + rotation;
			xVertices[i] = x + Math.round(radius * Math.cos(angle));
			yVertices[i] = y + Math.round(radius * Math.sin(angle));
		}

		for (let i = 0; i < sides - 1; i++) {
			this.drawLine(
				xVertices[i],
				yVertices[i],
				xVertices[i + 1],
				yVertices[i + 1],
				color,
			);
		}
		this.drawLine(
			xVertices[sides - 1],
			yVertices[sides - 1],
			xVertices[0],
			yVertices[0],
			color,
		);

		if (filled) {
			let minY = yVertices[0];
			let maxY = yVertices[0];
			for (let i = 1; i < sides; i++) {
				if (yVertices[i] < minY) minY = yVertices[i];
				if (yVertices[i] > maxY) maxY = yVertices[i];
			}

			for (let scanY = minY + 1; scanY < maxY; scanY++) {
				const intersectPoints: number[] = [];
				for (let i = 0; i < sides; i++) {
					const next = (i + 1) % sides;
					if (
						(yVertices[i] < scanY && yVertices[next] >= scanY) ||
						(yVertices[next] < scanY && yVertices[i] >= scanY)
					) {
						intersectPoints.push(
							xVertices[i] +
								((scanY - yVertices[i]) * (xVertices[next] - xVertices[i])) /
									(yVertices[next] - yVertices[i]),
						);
					}
				}
				intersectPoints.sort((a, b) => a - b);
				for (let i = 0; i < intersectPoints.length; i += 2) {
					this.drawLine(
						Math.round(intersectPoints[i]),
						scanY,
						Math.round(intersectPoints[i + 1]),
						scanY,
						color,
					);
				}
			}
		}
	}

	drawSprite(
		image: Uint8Array,
		width: number,
		height: number,
		_pitch: number,
		x: number,
		y: number,
		scale = 1,
	) {
		for (let scaledY = 0; scaledY < height * scale; scaledY++) {
			for (let scaledX = 0; scaledX < width * scale; scaledX++) {
				const spriteX = scaledX / scale;
				const spriteY = scaledY / scale;
				const spriteBit = spriteX % 8;
				const spriteByte =
					image[
						Math.floor(spriteY) * Math.ceil(width / 8) + Math.floor(spriteX / 8)
					];
				const color = (spriteByte >> (7 - spriteBit)) & 0x01;
				this.drawPixel(x + scaledX, y + scaledY, color);
			}
		}
	}
}
