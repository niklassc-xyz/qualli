import KI from "./KI.js";

export default class KI2 extends KI {
	constructor(g, team) {
		super(g, team);
		this.a;
		this.b;
	}

	alarmieren(nr) {
		switch (nr) {
			case 0:
				if (this.deleteIfDefeatedAndCheckIfWon())
					return;

				// Get bases and calculate available jellies
				let bases = this.getOwnBases();
				if(bases.length === 0)
					return;
				let avail = 0;
				for (let i = 0; i < bases.length; i++)
					avail += bases[i].units * 0.75;

				// Get list of enemy bases that are weaker than then available jellies
				let attackList = this.getEnemyBubblesWeakerThan(avail);

				if (attackList.length === 0) {
					this.alarm[0] = 100 + Math.round(Math.random() * 100);
					return;
				}

				// find best target
				let bestTarget;
				let bestTargetValue = Number.MAX_VALUE;
				for(let i = 0; i < attackList.length; i++) {
					let currBubbleVal = attackList[i].units / attackList[i].size;
					if(currBubbleVal < bestTargetValue) {
						bestTarget = attackList[i];
						bestTargetValue = currBubbleVal;
					}
				}

				// attack
				for (let i = 0; i < bases.length; i++) {
					this.angriff(bases[i], bestTarget);
					this.angriff(bases[i], bestTarget);
				}

				this.alarm[0] = 50 + Math.round(Math.random() * 100);
				break;

			default:
				console.log("Fehler: alarm() von KI: alarm() aufgerufen ohne nr");
		}
	}
}
