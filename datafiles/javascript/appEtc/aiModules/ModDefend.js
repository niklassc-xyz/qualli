import * as math from "../../parapluie/functions/math.js";
import AiModule from "./AiModule.js";
import KI from "../KI.js";

export default class ModDefend extends AiModule {
	// TODO store ai in this
	constructor(g) {
		super(g);
	}


	/**
	 * [TODO:description]
	 *
	 * @param {KI} ai - AI instance that is modulated
	 */
	modStep(ai) {
		let bases = ai.getOwnBases();

		// Check all own bases if they need to be defended
		for (let i = 0; i < bases.length; i++) {
			let bubble = bases[i];

			// TODO check endless loop → if bases contains only bubble

			// Send support from random other own bubble
			if (bubble.getArrivingEnemy() >= bubble.units + bubble.arriving[bubble.team]) {
				let randBubble = math.chooseRandom(bases);

				if (randBubble === bubble)
					continue;

				if (!randBubble.createQueue.isEmpty()) {
					continue;
				}

				ai.angriff(randBubble, bubble);
				// break
			}
		}
	}

	drawIcon(x, y, r) {
		this.g.painter.drawCircle(x, y, r, true);
		this.g.painter.ctx.fillStyle = "#5fbf20";
		this.g.painter.drawCircle(x, y, r, false);
	}
}
