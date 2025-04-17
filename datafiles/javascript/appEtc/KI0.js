import KI from "./KI.js";

export default class KI0 extends KI {
	constructor(g, team) {
		super(g, team);
	}

	// TODO rename
	getEinnehmlist() {
		var feasibleTargets = [];
		var strongestPlanet = this.getOwnStrongestBase();
		if(strongestPlanet === undefined)
			return [];

		let foreignBases = this.getForeignBases();
		for(let i = 0; i < foreignBases.length; i++) {
			if (Math.floor(strongestPlanet.units / 2) > foreignBases[i].units) {
				feasibleTargets.push(foreignBases[i]);
			}
		}
		return feasibleTargets;
	}

	// TODO move to super
	alarmieren(nr) {
		switch(nr) {
			case 0:
				if(this.deleteIfDefeatedAndCheckIfWon())
					return;

				var feasibleTargets = this.getEinnehmlist();
				if(feasibleTargets.length === 0) { // Wenn kein Planet eingenommen werden kann, schicke von zufälligem eigenen Planten Schiffe zum Stärksten
					// console.log("Kein Einnehmbarer Planet");
					var bases = this.getOwnBases();
					var baseStart = bases[Math.round(Math.random() * (bases.length-1))];
					var baseTarget = this.getOwnStrongestBase();
				} else { // Wenn Planet eingenommen werden kann, nimm ein.
					// Wähle zufälligen Startplaneten aus dem Array der eigenen Planeten aus
					var baseStart = this.getOwnStrongestBase();
					// Wähle zufälligen Planeten als Ziel
					var baseTarget = feasibleTargets[Math.round(Math.random() * (feasibleTargets.length-1))];
				}

				// Create jellies
				if(baseStart !== baseTarget)
					this.angriff(baseStart, baseTarget);

				this.alarm[0] = 200 + Math.round(Math.random() * 100);
				break;
			default:
				console.log("Fehler: alarm() von KI: alarm() aufgerufen ohne nr");
		}
	}
}
