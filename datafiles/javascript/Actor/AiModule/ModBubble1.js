import AiModule from "./AiModule.js";

// Checks if an attack is possible, if so, sends 50% of each other bubble to
// the strongest and after a timeout attacks twice from strongest (75%)
// Best target is chosen among the feasible targets based on its size (positive)
// and defending units (negative)
export default class ModBubble1 extends AiModule {
	actor; team; // Set by Actor when added
	constructor(g) {
		super(g);

		this.setTimer("mainAction", 20);

		this.plannedSource;
	}

	execTimer(name) {
		switch (name) {
			case "mainAction": {
				// Checks if attack makes sense, if it does, send units from
				// all other bubbles to the strongest and start time for the
				// attack

				const ownStrongestBubble = this.getOwnStrongestBubble()
				if (typeof ownStrongestBubble === "undefined") {
					this.setTimer("mainAction", 100);
					return;
				}
				
				const ownBubbles = this.getOwnBubbles();
				// Calculate how many units would be sent to the strongest, when deciding to attack
				let supportCapacity= 0;
				for (let i = 0; i < ownBubbles.length; i++)
					if(ownBubbles[i] !== ownStrongestBubble)
						supportCapacity += ownBubbles[i].units * 0.5;

				// Get list of enemy bases that are weaker than then available jellies
				const requiredMargin = 30; // Attack takes time → require more
				const feasibleTargets = this.getForeignBubblesWeakerThan((supportCapacity + ownStrongestBubble.units) * 0.75 - requiredMargin);

				if (feasibleTargets.length === 0) {
					this.setTimer("mainAction", 100 + Math.round(Math.random() * 100));
					return;
				}

				// Pool jellies on strongest planet, then attack
				for (let i = 0; i < ownBubbles.length; i++) {
					if (ownBubbles[i] !== ownStrongestBubble)
						ownBubbles[i].action(ownStrongestBubble);
				}

				this.plannedSource = ownStrongestBubble;
				this.setTimer("attack", 250);
				return;
			}

			case "attack": {
				let requiredMargin = 20;
				let feasibleTargets = this.getForeignBubblesWeakerThan(this.plannedSource.units - requiredMargin);
				if(feasibleTargets.length === 0) {
					this.setTimer("mainAction", 50 + Math.round(Math.random() * 50));
					return;
				}

				// Chose best target based on size and units
				let bestTarget;
				let bestTargetValue = Number.MIN_VALUE;
				for(let i = 0; i < feasibleTargets.length; i++) {
					let currBubbleVal = feasibleTargets[i].size / feasibleTargets[i].units;
					if(currBubbleVal > bestTargetValue) {
						bestTarget = feasibleTargets[i];
						bestTargetValue = currBubbleVal;
					}
				}

				this.plannedSource.action(bestTarget);
				this.plannedSource.action(bestTarget);

				this.setTimer("mainAction", 100 + Math.round(Math.random() * 50));
				return;
			}
		}

		super.execTimer(name);
	}

	drawIcon(x, y, r=8) {
		super.drawIcon(x, y, r);

		this.g.painter.setStrokeStyle("rgba(50, 50, 50, 0.6)");
		this.g.painter.ctx.fillStyle = "#efdf20";
		this.g.painter.fillRect(x-r, y-r, 2*r, 2*r);
		this.g.painter.strokeRect(x-r, y-r, 2*r, 2*r);
	}
}
