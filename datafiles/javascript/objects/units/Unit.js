import SpriteEntity from "../../parapluie/objects/SpriteEntity.js";
import * as collision from "../../parapluie/functions/collision.js";

export default class Unit extends SpriteEntity {
	constructor(g, x, y, width, height, sprite, team, target, source, unitValue) {
		super(g, x, y, width, height, sprite);

		this.source = source;
		this.team = team;
		this.target = target;
		this.unitValue = unitValue; // Specifies how many units this counts as → e.g. for damage
	}

	step() {
		super.step();

		// Check if missile collided with target
		if (typeof this.target !== "undefined" && collision.rectangleInRectangle(
			this.x - (this.width/2),
			this.y - (this.height/2),
			this.x + (this.width/2),
			this.y + (this.height/2),
			this.target.x - (this.target.width/2),
			this.target.y - (this.target.height/2),
			this.target.x + (this.target.width/2),
			this.target.y + (this.target.height/2)
		)) {
			this.destroy();

			this.target.receiveUnits(this.unitValue, this.team, this.source);
		}
	}

	draw() {
		super.draw();


		// Draw target DEBUG
		if (this.g.getDebug()) {
			this.g.painter.setStrokeStyle("red");
			this.g.painter.setLineWidth(2);
			this.g.painter.strokeCross(this.targetX, this.targetY, 6);
		}
	}

	destroy() {
		super.destroy();

		this.target.arriving[this.team]--;
	}
}
