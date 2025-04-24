export default class AiModule {
	constructor(g) {
		this.g = g;
		// TimerName: steps left
		this._timers = new Map();
	}

	stepModule() {
		for (let [name, timeLeft] of this._timers) {
			this._timers.set(name, timeLeft-1);
			if (this._timers.get(name) <= 0) {
				this._timers.delete(name);
				console.log("EXEC");
				this.execTimer(name);
			}
		}
	}

	// Alarams should return, not break. Subclasses should call this **after**
	// doing their timer switch
	execTimer(name) {
		// switch (name) {
		// 	case 0:
		// }

		console.error(`Error: Timer ${name} does not exist.`);
	}

	drawIcon(x, y, r=8) {
		
	}

	getOwnStrongestBubble() {
		let bubbles = this.g.room.baseManager.getBubblesByTeam(this.team);
		console.log(bubbles);
		if(bubbles.length === 0) return undefined;
		let strongestIndex = 0;
		for (let i = 0; i < bubbles.length; i++) {
			if(bubbles[i].units > bubbles[strongestIndex].units) {
				strongestIndex = i;
			}
		}
		return bubbles[strongestIndex];
	}

	getOwnBubbles() {
		return this.g.room.baseManager.getBubblesByTeam(this.team);
	}

	getForeignBubbles() {
		let allBases = this.g.room.baseManager.getBubbles();
		let bases = [];
		for (let i = 0; i < allBases.length; i++) {
			if (allBases[i].team !== this.team) {
				bases.push(allBases[i]);
			}
		}
		return bases;
	}
}
