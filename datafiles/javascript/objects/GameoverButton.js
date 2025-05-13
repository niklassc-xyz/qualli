import Button from "../parapluie/objects/util/Button.js";

export default class GameoverButton extends Button {
	constructor(g, won, width=120, height=120) {
		let onClick = () => {
			this.g.showEndgame(won);
		};

		let text = "👑";
		if (!won)
			text = "🏳";

		const x = g.roomWidth - 1.5*width;
		const y = g.roomHeight + 2*height;

		super(g, text, x, y, width, height, onClick, false);

		this.xTarget = this.g.roomWidth - 1.2*width;
		this.yTarget = this.g.roomHeight - 1.5*height;
	}

	step() {
		this.x += 0.2 * (this.xTarget - this.x);
		this.y += 0.2 * (this.yTarget - this.y);
	}

	draw() {
		super.draw();


	}
}
