import SimBubble from "./SimBubble.js";
import GameEntity from "../../parapluie/objects/GameEntity.js";
import Color from "../../appEtc/color/Color.js";

export default class SimBubbleEmitter extends GameEntity {
	// TODO use color class → implement rgba rgb colors
	// constructor(basecolor = [220, 220, 250], p = 0.1) {
	constructor(g, basecolor = [120, 210, 255], p = 0.1) {
		super(g);

		this.basecolor = basecolor;
		this.p = p;
	}

	step() {
		super.step();

		if (Math.random() < this.p) {
			this.generateBubble(false);
		}
	}

	// Set to true to evenly distributed it over the screen, otherwise bubbles
	// get created at the bottom, outside of the room
	generateBubble(distributed=false) {
			let sourceX = this.g.roomWidth/2;
			let sourceWidth = this.g.roomWidth;
			
			let r = Math.random() * 64 + 8;

			let x = sourceX - sourceWidth + 2*Math.random()*sourceWidth;
			let y = this.g.roomHeight + r;
			if (distributed) {
				x = Math.random() * this.g.roomWidth;
				y = Math.random() * this.g.roomHeight;
			}

			let base = new Color(this.basecolor[0], this.basecolor[1], this.basecolor[2]);
			let black = new Color(0, 0, 50);
			let white = new Color(255, 255, 255);

			let darker = base.getMix(black, 0.5);
			let lighter = base.getMix(white, 0.5);

			let c = [base, darker, lighter];
			let ci = Math.floor(Math.random() * c.length);

			let carr = [c[ci].r, c[ci].g, c[ci].b];

			return this.g.addObject(new SimBubble(this.g, x, y, r, carr));
	}
}
