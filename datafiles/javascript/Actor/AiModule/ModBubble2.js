import AiModule from "./AiModule.js";

// Regularly checks if it is possible to capture a bubble by attack twice with
// all own bubbles (75%). 
// Best target is chosen among the feasible targets based on its size (positive)
// and defending units (negative)
export default class ModBubble2 extends AiModule {
	constructor(g) {
		super(g);

		this.setTimer("mainAction", 20);

		this.plannedSource;
	}

	execTimer(name) {
		switch (name) {
			case "mainAction": {
				const ownBubbles = this.getOwnBubbles();
				if(ownBubbles.length === 0) {
					this.setTimer("mainAction", 100);
					return;
				}

				let attackCapacity = 0;
				for (let i = 0; i < ownBubbles.length; i++)
					attackCapacity += ownBubbles[i].units * 0.75;

				let feasibleTargets = this.getForeignBubblesWeakerThan(attackCapacity);
				if (feasibleTargets.length === 0) {
					this.setTimer(100 + Math.round(Math.random() * 100));
					return;
				}


				// Chose best target based on size and units
				// TODO optimize → size should be more important
				let bestTarget;
				let bestTargetValue = Number.MIN_VALUE;
				for(let i = 0; i < feasibleTargets.length; i++) {
					let currBubbleVal = feasibleTargets[i].size / feasibleTargets[i].units;
					if(currBubbleVal > bestTargetValue) {
						bestTarget = feasibleTargets[i];
						bestTargetValue = currBubbleVal;
					}
				}

				// Attack
				for (let i = 0; i < ownBubbles.length; i++) {
					ownBubbles[i].action(bestTarget);
					ownBubbles[i].action(bestTarget);
				}

				this.setTimer(50 + Math.round(Math.random() * 100));
				return;
			}
		}

		super.execTimer(name);
	}

	drawIcon(x, y, r=8) {
		super.drawIcon(x, y, r);

		this.g.painter.setStrokeStyle("rgba(50, 50, 50, 0.6)");
		this.g.painter.ctx.fillStyle = "#f62";
		this.g.painter.fillRect(x-r, y-r, 2*r, 2*r);
		this.g.painter.strokeRect(x-r, y-r, 2*r, 2*r);
	}
}
