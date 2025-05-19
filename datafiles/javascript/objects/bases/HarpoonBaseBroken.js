import Base from "./Base.js";
import HarpoonBase from "./HarpoonBase.js";

export default class HarpoonBaseBroken extends Base {
	constructor(g, x, y) {
		const width = 128;
		const height = 128;

		const sprite = g.resourceManager.getSpriteByPath("datafiles/sprites/Planet.png");
		const team = 0;
		super(g, x, y, width, height, sprite, 0);

		this.progress = 0;
	}

	step() {
		super.step();

		if (this.progress >= 100) {
			this.g.room.addBase(new HarpoonBase(this.g, this.x, this.y, 1));
			this.destroy();
		}
	}

	draw() {
		super.draw();

		this.drawProgress();
	}

	receiveUnits(n, team, source=undefined) {
		super.receiveUnits(n, team, source);

		this.progress += n;
	}

	drawProgress() {
		// Draw circle-indicator of left ttl
		const radius = 1.1 * this.width/2;
		this.g.painter.setLineWidth(3);

		this.g.painter.setStrokeStyle("white");

		// TODO dont access ctx directly
		this.g.painter.ctx.beginPath();
		this.g.painter.ctx.arc(this.x,
			this.y,
			radius,
			2.0 * Math.PI * ((100-this.progress)/100),
			2.0 * Math.PI);

		this.g.painter.ctx.stroke();
	}
}
