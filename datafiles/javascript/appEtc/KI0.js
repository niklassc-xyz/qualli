import KI from "./KI.js";

export default class KI0 extends KI {
	constructor(g, team) {
		super(g, team);
	}

	getEinnehmlist() {
		var einnehmlist = [];
		var strongestPlanet = this.getStrongestPlanet(); // TODO rename
		if(strongestPlanet === undefined)
			return [];
		for(var i = 0; i < this.g.room.bubbles.length; i++) {
			if(this.g.room.bubbles[i].team !== this.team && Math.floor(strongestPlanet.units / 2) > this.g.room.bubbles[i].units) {
				einnehmlist[einnehmlist.length] = this.g.room.bubbles[i];
			}
		}
		return einnehmlist;
	}

	// TODO move to super
	alarmieren(nr) {
		switch(nr) {
			case 0:
				if(this.deleteIfDefeatedAndCheckIfWon())
					return;

				var einnehmlist = this.getEinnehmlist();
				if(einnehmlist.length === 0) { // Wenn kein Planet eingenommen werden kann, schicke von zufälligem eigenen Planten Schiffe zum Stärksten
					// console.log("Kein Einnehmbarer Planet");
					var bubbles = this.getBubbles();
					var planet_start = bubbles[Math.round(Math.random() * (bubbles.length-1))];
					var planet_ziel = this.getStrongestPlanet();
				} else { // Wenn Planet eingenommen werden kann, nimm ein.
					// Wähle zufälligen Startplaneten aus dem Array der eigenen Planeten aus
					//var zw = Math.round(Math.random() * (bubbles.length-1));
					//var planet_start = bubbles[zw];
					var planet_start = this.getStrongestPlanet();
					// Wähle zufälligen Planeten als Ziel
					var planet_ziel = einnehmlist[Math.round(Math.random() * (einnehmlist.length-1))];
				}

				// Create jellies
				if(planet_start !== planet_ziel)
					this.angriff(planet_start, planet_ziel);

				this.alarm[0] = 200 + Math.round(Math.random() * 100);
				break;
			default:
				console.log("Fehler: alarm() von KI: alarm() aufgerufen ohne nr");
		}
	}
}
