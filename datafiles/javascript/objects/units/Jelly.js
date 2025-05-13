import DiffuseMissile from "./DiffuseMissile.js";
import Colors from "../../appEtc/color/Colors.js";

export default class Jelly extends DiffuseMissile {
	/**
	 * [TODO:description]
	 *
	 * @param {number} x - [TODO:description]
	 * @param {number} y - [TODO:description]
	 * @param {number} team - [TODO:description]
	 * @param {Bubble} target - [TODO:description]
	 * @param {number} [size] - [TODO:description]
	 */
	constructor(g, x, y, team, target, source, unitValue=1) {
		let sprite;
		switch (team) {
			case 1:
				sprite = "datafiles/sprites/qualleRed.png";
				break;
			case 2:
				sprite = "datafiles/sprites/qualleBlue.png";
				break;
			case 3:
				sprite = "datafiles/sprites/qualleGreen.png";
				break;
			case 4:
				sprite = "datafiles/sprites/qualleYellow.png";
				break;
			default:
				throw new Error(`Tried creating Jelly with unsupported team (${team})`);
		}

		const targetWidth = 32 * unitValue;
		const targetHeight = 21 * unitValue;
		const startDiffusion = 265;
		super(g, x, y, sprite, targetWidth, targetHeight, team, target, source, unitValue, startDiffusion);

		this.size = this.unitValue;
	}

	step() {
		super.step();

		// console.log(this.width, this.height);
	}

	draw() {
		// TODO fix this
		// TODO rotation
		// TODO origin
		// TODO ellipsis
		// Jelly glow
		if (this.g.settings.getJellyGlow()) {
			let c = Colors.team[this.team];
			this.g.painter.ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, 0.025`;
			let maxr = Math.max(this.width, this.height);

			this.g.painter.fillCircle(this.x, this.y, maxr * 2.7);
			this.g.painter.fillCircle(this.x, this.y, maxr * 2.0);
		}

		super.draw();
	}
}
