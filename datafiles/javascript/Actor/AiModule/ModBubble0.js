import AiModule from "./AiModule.js";

// Attacks with 50 % of the strongest bubble if possible, otherwise send units
// to strongest bubble from random one
export default class ModBubble0 extends AiModule {
	actor; team; // Set by Actor when added
	constructor(g) {
		super(g);

		this._timers.set("mainAction", 20);
	}

	execTimer(name) {
		switch (name) {
			case "mainAction":
				console.log("mainAction");

				const feasibleTargets = this.getFeasibleTargets();
				if (feasibleTargets.length === 0) {
					console.log("Support");
					// No feasible targets → send units from random bubble to strongest
					const ownBases = this.getOwnBubbles();
					var bubbleStart = ownBases[Math.floor(Math.random() * ownBases.length)];
					var bubbleTarget = this.getOwnStrongestBubble();
				} else {
					console.log("Attack");
					// A Bubble can be captured → attack
					var bubbleStart = this.getOwnStrongestBubble();
					var bubbleTarget = feasibleTargets[Math.floor(Math.random() * feasibleTargets.length)];
				}

				console.log(bubbleStart, bubbleTarget);
				if (bubbleStart !== bubbleTarget)
					bubbleStart.action(bubbleTarget);
					// this.action(bubbleStart, bubbleTarget);

				this._timers.set("mainAction", 200 + Math.round(Math.random() * 100));
				return;
		}

		super.execTimer(name);
	}

	drawIcon(x, y, r=8) {
		super.drawIcon(x, y, r);

		this.g.painter.setStrokeStyle("rgba(50, 50, 50, 0.6)");
		this.g.painter.ctx.fillStyle = "#5fbf20";
		this.g.painter.fillRect(x-r, y-r, 2*r, 2*r);
		this.g.painter.strokeRect(x-r, y-r, 2*r, 2*r);
	}

	getFeasibleTargets() {
		let feasibleTargets = [];
		let ownStrongestBubble = this.getOwnStrongestBubble();
		if(ownStrongestBubble === undefined)
			return [];

		let foreignBubbles = this.getForeignBubbles();
		for(let i = 0; i < foreignBubbles.length; i++) {
			if (Math.floor(ownStrongestBubble.units / 2) > foreignBubbles[i].units) {
				feasibleTargets.push(foreignBubbles[i]);
			}
		}
		return feasibleTargets;
	}
}
