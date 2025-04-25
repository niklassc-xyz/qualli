import AiModule from "./AiModule.js";
import * as math from "../../parapluie/functions/math.js";

// Checks in each step if an own bubble will be captured
// (arriving enemy units > ownUnits+ownArrivingUnits)
// Sends support from other owned bubbles
export default class ModDefendBubble extends AiModule {
	constructor(g) {
		super(g);
	}

	stepModule() {
		super.stepModule();


		let bubbles = this.getOwnBubbles();

		// Check any of the own bubbles need to be defended
		for (let i = 0; i < bubbles.length; i++) {
			let bubble = bubbles[i];

			// TODO check endless loop → if bubbles contains only "bubble"

			// Send support from random other own bubble
			if (bubble.getArrivingEnemy() >= bubble.units + bubble.arriving[bubble.team]) {
				const randBubble = math.chooseRandom(bubbles);

				if (randBubble === bubble)
					continue;

				if (!randBubble.createQueue.isEmpty()) {
					continue;
				}

				randBubble.action(bubble);
				// break
			}
		}

	}

	drawIcon(x, y, r=8) {
		super.drawIcon(x, y, r);

		this.g.painter.setStrokeStyle("rgba(50, 50, 50, 0.6)");
		this.g.painter.ctx.fillStyle = "#5b2";
		this.g.painter.drawCircle(x, y, r);
	}
}
