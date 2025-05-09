export default class AiModule {
	actor; team; // Set by Actor when added
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
				this.execTimer(name);
			}
		}
	}

	setTimer(name, steps) {
		this._timers.set(name, steps);
	}

	// Alarms should return, not break. Subclasses should call this **after**
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

	getOwnBubblesExcept(excludeBubble) {
		let bubbles = this.getOwnBubbles();

		return bubbles.filter(item => item !== excludeBubble);
	}

	getForeignBubbles() {
		let allBubbles = this.g.room.baseManager.getBubbles();
		let bubbles = [];
		for (let i = 0; i < allBubbles.length; i++) {
			if (allBubbles[i].team !== this.team)
				bubbles.push(allBubbles[i]);
		}
		return bubbles;
	}

	getForeignBubblesWeakerThan(amount) {
		const foreignBubbles = this.getForeignBubbles();
		let bubbles = [];
		for (let i = 0; i < foreignBubbles.length; i++) {
			if (foreignBubbles[i].units < amount)
				bubbles.push(foreignBubbles[i]);
		}
		return bubbles;
	}
}
