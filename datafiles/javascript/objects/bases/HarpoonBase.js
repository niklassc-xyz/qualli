import Base from "./Base.js";
import * as math from "../../parapluie/functions/math.js";
import Harpoon from "../units/Harpoon.js";
import Boss from "./Boss.js";
import Colors from "../../appEtc/color/Colors.js";

export default class HarpoonBase extends Base {
	constructor(g, x, y, team=0) {
		const width = 128;
		const height = 128;

		const sprite = g.resourceManager.getSpriteByPath("datafiles/sprites/bubble1.png");
		super(g, x, y, width, height, sprite, team);

		// TODO dont use svg directly
		this.spriteHarpoon = g.resourceManager.getSpriteByPath("datafiles/sprites/harpoon.svg");

		this.health = 100;
		this.charge = 0;
		// this.chargeGain = 0.2;
		this.chargeGain = 0.3;

		this.harpoons = [];
	}


	stepSelected() {
		super.stepSelected();

		const dirToCursor = math.pointDirection(this.x, this.y, this.g.input.getX(), this.g.input.getY());
		this.setDirection(dirToCursor);
	}

	action(base) {
		if (this.harpoons.length < 1)
			return

		if (!(base instanceof Boss))
			return;

		const harpoon = this.harpoons.pop();
		harpoon.target = base;
		harpoon.setSpeed(7);
	}

	step() {
		super.step();
		this.health = Math.max(0, this.health-0.1);

		if (this.harpoons.length < 3)
			this.charge = Math.min(this.charge + this.chargeGain, 100);

		if (this.charge >= 100) {
			this.charge -= 100;
			const harpoon = this.g.room.addObject(new Harpoon(this.g, this.x, this.y, this.team, undefined, this));
			this.harpoons.push(harpoon);
		}
	}

	draw() {
		super.draw();

		this.drawHealthbar();
		this.drawCharge();
	}

	drawCharge() {
		let lineWidth = 3;
		this.g.painter.setLineWidth(lineWidth);
		let radius = 10 + 1.1 * this.width/2;
		this.g.painter.setStrokeStyle("#fc5");

		for (let i = 0; i < this.harpoons.length; i++) {
			const margin = 3;
			this.g.painter.strokeCircle(this.x, this.y, radius);

			radius += lineWidth + margin;
			lineWidth = Math.max(lineWidth-1, 1);
		}

		// TODO dont access ctx directly
		this.g.painter.ctx.beginPath();
		this.g.painter.ctx.arc(this.x,
			this.y,
			radius,
			2.0 * Math.PI * ((100-this.charge)/100),
			2.0 * Math.PI);

		this.g.painter.ctx.stroke();
	}

	drawHealthbar() {
		// Draw circle-indicator of left ttl
		const radius = 1.1 * this.width/2;
		this.g.painter.setLineWidth(3);

		this.g.painter.setStrokeStyle(Colors.healthbarRed.cRgb());
		this.g.painter.strokeCircle(this.x, this.y, radius);

		// TODO dont access ctx directly
		this.g.painter.setStrokeStyle(Colors.healthbarGreen.cRgb());
		this.g.painter.ctx.beginPath();
		this.g.painter.ctx.arc(this.x,
			this.y,
			radius,
			2.0 * Math.PI * ((100-this.health)/100),
			2.0 * Math.PI);

		this.g.painter.ctx.stroke();
	}
}
