import AiModule from "./AiModule.js";
import BubbleTemp from "../../objects/bases/BubbleTemp/BubbleTemp.js";

// Checks each step if a TempBubble owned by actor is going to be destroyed soon,
// tries to evacuate to own bubble if possible, otherwise flee to random bubble
// owned by anyone.
export default class ModFleeTemp extends AiModule {
	constructor(g) {
		super(g);
	}

	stepModule() {
		super.stepModule();

		let bubbles = this.getOwnBubbles();

		// Check if Actor owns TempBubbles that will be destroyed soon
		for (let i = 0; i < bubbles.length; i++) {
			let bubble = bubbles[i];
			if (bubble instanceof BubbleTemp) {
				if (bubble.ttl <= bubble.units * 1.05) {
					let n = 1;
					// Flee to random owned base
					for (let i = 0; i < n; i++) {
						let potentialTargets = this.getOwnBubblesExcept(bubble);
						let target;
						if (potentialTargets.length !== 0) {
							target = potentialTargets[Math.floor(Math.random()*potentialTargets.length)];
						} else {
							// If not own bubbles left, flee to random bubble
							// TODO dont use same bubble as source and target
							const allBubbles = this.g.room.baseManager.getBubbles();
							let ri = Math.floor(Math.random() * allBubbles.length);
							target = allBubbles[ri];
						}

						if (target === undefined)
							return;

						bubble.action(target);
					}
				}
			}
		}
	}

	drawIcon(x, y, r=8) {
		super.drawIcon(x, y, r);

		this.g.painter.setStrokeStyle("rgba(50, 50, 50, 0.6)");
		this.g.painter.ctx.fillStyle = "#fd2";
		this.g.painter.drawCircle(x, y, r);
	}
}
