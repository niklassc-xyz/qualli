import AiModule from "./AiModule.js";
import BubbleTemp from "../../objects/BubbleTemp.js";

// When ttl of bubble is soon over, this module evacuates to a random own
// bubble if available. Otherwise to random other bubble.

export default class ModFleeTemp extends AiModule {
	constructor(g) {
		super(g);
	}

	modStep(ai) {
		let bases = ai.getOwnBases();

		// Check own bases if they're being destroyed soon
		for (let i = 0; i < bases.length; i++) {
			let bubble = bases[i];
			if (bubble instanceof BubbleTemp) {
				if (bubble.ttl <= bubble.units * 1.05) {
					let n = 1;
					// Flee to random owned base
					for (let i = 0; i < n; i++) {
						let target = ai.getRandomBaseOtherThan(bubble);
						// Use any random bubble
						if (target === undefined) {
							let ri = Math.floor(Math.random() * this.g.room.bases.length);
							target = this.g.room.bases[ri];
						}
						if (target === undefined) {
							break;
						}

						ai.angriff(bubble, target);
					}
				}
			}
		}
	}

	drawIcon(x, y, r) {
		this.g.painter.drawCircle(x, y, r, true);
		this.g.painter.ctx.fillStyle = "#ffdf20";
		this.g.painter.drawCircle(x, y, r, false);
	}
}
