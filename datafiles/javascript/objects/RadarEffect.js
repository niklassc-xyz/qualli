import * as f from "../functions.js";

export default class RadarEffect extends Effect {
	constructor(g, x, y, ttl, color) {
		super(g, x, y, ttl);
		this.color = color;

		this.radius = 0;
		this.radiusStep = 5;
	}

	step() {
		super.step();
		this.radius += this.radiusStep;
	}

	draw() {
		super.draw();

		this.g.painter.ctx.strokeStyle = this.color;
		this.g.painter.ctx.lineWidth = 4;

		this.g.painter.ctx.globalAlpha = this.relTtl();
		f.drawCircle(this.g.painter.ctx, this.x, this.y, this.radius, true)
		this.g.painter.ctx.globalAlpha = 1.0;
	}

	relTtl() {
		return this.ttl / this.totalTtl
	}
}
