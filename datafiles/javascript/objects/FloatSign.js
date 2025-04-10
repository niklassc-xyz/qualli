import PhysicalEntity from "../parapluie/objects/PhysicalEntity.js";


// TODO extend effects
export default class FloatSign extends PhysicalEntity {
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
		this.font = Math.round(this.fontSize) + "px fnt_Comforta_Bold";
	}

	step() {
		super.step();

		this.ttl--;

		if (this.ttl <= 0) {
			this.destroy();
		}
	}

	draw() {
		this.g.ctx.font = this.font;

		// Text
		this.g.ctx.lineWidth = 4;
		this.g.ctx.fillStyle = this.color;
		this.g.ctx.strokeStyle = this.background;

		this.g.ctx.globalAlpha = this.ttl / this.startTtl;
		
		this.g.ctx.strokeText(this.text, this.x, this.y);
		this.g.ctx.fillText(this.text, this.x, this.y);

		this.g.ctx.globalAlpha = 1;
	}
}

