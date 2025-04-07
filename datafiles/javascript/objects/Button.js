import * as f from "../functions.js";
import SpriteEntity from "../parapluie/objects/SpriteEntity.js";

// TODO extend from Entity instead of SpriteEntity
export default class Button extends SpriteEntity {
	constructor(g, text, x, y, width, height, onClick, disabled) {
		super(g, x, y, width, height, g.sprLock);
		this.text = text;
		this.onClick = onClick;
		this.borderColour = "white";
		this.fontSize = 56;
		this.font =  Math.round(this.fontSize) + "px fnt_Comforta_Regular";
		this.disabled = (disabled === undefined) ? false : disabled;
		this.animationSpeed = 0.1 + Math.random() * 0.2

		// TODO calculate font size based on width and text
	}

	setFontSize(size) {
		this.fontSize = size;
		this.resize();
	}

	resize() {
		super.resize();
		this.font = Math.round(this.fontSize) + "px fnt_Comforta_Regular";
	}

	draw() {
		let lw = 2;

		if (f.point_in_rectangle(this.g.input.x, this.g.input.y, this.x, this.y, this.x+this.width, this.y+this.height)) {
			lw = 8;
		}


		// TODO sinus curve
		let animationN = 32
		// let animationSpeed = 0.3
		let fill = this.g.stepCount * this.animationSpeed % animationN
		fill = Math.abs(fill - animationN / 2)
		// Normalize
		fill = fill / (animationN/2)
		//  Scale 
		fill = fill * 0.3

		this.g.ctx.lineWidth = lw;
		this.g.ctx.strokeStyle = "rgba(50, 50, 50, 0.3)";
		f.draw_roundrect(
			this.g.ctx,
			this.x,
			this.y,
			this.width + lw,
			this.height + lw,
			6,
			false,
			true
		);

		this.g.ctx.strokeStyle = this.borderColour;

		this.g.ctx.fillStyle = `rgba(200, 200, 255, ${fill})`;
		f.draw_roundrect(
			this.g.ctx,
			this.x,
			this.y,
			this.width,
			this.height,
			6,
			true,
			true
		);

		// let locked = false; // TODO implement lock system
		if(this.disabled) {
			this.g.ctx.strokeStyle = "#607d8b";
			this.g.ctx.fillStyle = "#607d8b";
			this.g.ctx.drawImage(this.sprite, this.x - this.ox + this.width * 0.25, this.y - this.oy + this.height * 0.14, this.width * 0.5, this.height * 0.5);
		} else {
			this.g.ctx.strokeStyle = "white";
			this.g.ctx.fillStyle = "white";
		}


		this.g.ctx.textAlign = "center";
		this.g.ctx.textBaseline = "middle";
		this.g.ctx.font = this.font;
		this.g.ctx.fillText(
			this.text,
			this.x + this.width / 2,
			this.y + this.height / 2
		);
	}
}
