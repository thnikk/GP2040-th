import { GFX } from './gfx';
import { ButtonLayoutScreen } from './buttonScreen';
import {
	SCREEN_WIDTH,
	SCREEN_HEIGHT,
	GamepadInput,
	ScreenConfig,
} from './types';

const DISPLAY_SCALE = 4;

export class DisplayEmulator {
	gfx = new GFX();
	private screen: ButtonLayoutScreen | null = null;
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private scaledCanvas: HTMLCanvasElement;
	private scaledCtx: CanvasRenderingContext2D;
	private imageData: ImageData;
	invert = false;

	constructor() {
		this.canvas = document.createElement('canvas');
		this.canvas.width = SCREEN_WIDTH;
		this.canvas.height = SCREEN_HEIGHT;
		this.ctx = this.canvas.getContext('2d')!;
		this.imageData = this.ctx.createImageData(SCREEN_WIDTH, SCREEN_HEIGHT);
		this.scaledCanvas = document.createElement('canvas');
		this.scaledCanvas.width = SCREEN_WIDTH * DISPLAY_SCALE;
		this.scaledCanvas.height = SCREEN_HEIGHT * DISPLAY_SCALE;
		this.scaledCtx = this.scaledCanvas.getContext('2d')!;
		this.scaledCtx.imageSmoothingEnabled = false;
	}

	setConfig(config: ScreenConfig) {
		this.screen = new ButtonLayoutScreen(this.gfx, config);
	}

	render(input: GamepadInput, nowMs: number) {
		if (!this.screen) return;
		this.screen.render(input, nowMs);
		this.blit();
	}

	getDisplayCanvas(): HTMLCanvasElement {
		return this.scaledCanvas;
	}

	private blit() {
		const data = this.imageData.data;
		const fb = this.gfx.frameBuffer;
		const onColor = this.invert ? 0 : 255;
		const offColor = this.invert ? 255 : 0;
		for (let i = 0; i < SCREEN_WIDTH * SCREEN_HEIGHT; i++) {
			const j = i * 4;
			const v = fb[i] ? onColor : offColor;
			data[j] = v;
			data[j + 1] = v;
			data[j + 2] = v;
			data[j + 3] = 255;
		}
		this.ctx.putImageData(this.imageData, 0, 0);
		this.scaledCtx.clearRect(
			0,
			0,
			this.scaledCanvas.width,
			this.scaledCanvas.height,
		);
		this.scaledCtx.drawImage(
			this.canvas,
			0,
			0,
			this.scaledCanvas.width,
			this.scaledCanvas.height,
		);
	}
}
