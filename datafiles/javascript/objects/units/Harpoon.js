import Unit from "./Unit.js";

export default class Harpoon extends Unit {
	constructor(g, x, y, team, target, source, unitValue=20) {
		// TODO convert SVG
		const sprite = "datafiles/sprites/harpoon.svg";

		const scale = 3;
		const width = 44.859642 * scale;
		const height = 22.57221 * scale * 2;

		super(g, x, y, width, height, sprite, team, target, source, unitValue);

		this.ox = this.width / 2;
		this.oy = this.height / 2;

		this.size = this.unitValue;
		this.targetSpeed = 6;
	}

	step() {
		super.step();

		if (typeof this.target === "undefined") {
			this.setDirection(this.source.direction);
		}
	}
}
