import SpriteEntity from "../../parapluie/objects/SpriteEntity.js";

export default class Unit extends SpriteEntity {
	constructor(g, x, y, width, height, sprite, team, target, source, unitValue) {
		super(g, x, y, width, height, sprite);

		this.source = source;
		this.team = team;
		this.target = target;
		this.unitValue = unitValue; // Specifies how many units this counts as → e.g. for damage
	}

	destroy() {
		super.destroy();

		this.target.arriving[this.team]--;
	}
}
