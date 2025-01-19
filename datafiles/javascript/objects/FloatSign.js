import Object from "../engine/objects/Object.js";
import * as globals from "../globals.js";


// TODO extend effects
export default class FloatSign extends Object {
	constructor(g, text, x, y, color, fontSize=20, ttl=200) {
		super(g, x, y, 0, 0);
		this.text = text;
		this.color = color;

		this.fontSize = fontSize;
		this.setFontSize(fontSize)

		this.background = "white";

		this.startTtl = ttl;
		this.ttl = this.startTtl;
		this.vspeed = -1.5;
	}

	setFontSize(size) {
		this.fontSize = size;
		this.resize();
	}

	resize() {
		super.resize();
		this.font =	Math.round(this.fontSize) + "px fnt_Comforta_Bold";
	}

	step() {
		super.step();

		this.ttl--;

		if (this.ttl <= 0) {
			this.destroy();
		}
	}

	draw() {
		this.resize();

		this.g.ctx.font = this.font;

		// Text
		this.g.ctx.lineWidth = 4;
		this.g.ctx.fillStyle = this.color;
		this.g.ctx.strokeStyle = this.background;

		this.g.ctx.globalAlpha = this.ttl / this.startTtl;
		
		this.g.ctx.strokeText(this.text, this.xD, this.yD);
		this.g.ctx.fillText(this.text, this.xD, this.yD);

		this.g.ctx.globalAlpha = 1;
	}
}

