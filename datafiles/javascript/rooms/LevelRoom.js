import Room from "./../parapluie/Room.js";
import Button from "../parapluie/objects/util/Button.js";
import Settings from "../parapluie/Settings.js";
import Jelly from "../objects/Jelly.js";
import Base from "../objects/bases/Base.js";


// TODO Import these in the individual level rooms only when needed

// Abstract Class LevelRoom
// All levels should extend from this

export default class LevelRoom extends Room {
	static background = "datafiles/sprites/bg8FullHd.png";

	constructor(g, returnRoom = undefined) {
		super(g, returnRoom);

		if (this.constructor == LevelRoom) {
			throw new Error("Abstract classes can't be instantiated.");
		}

		/**
		 * List of active bubbles in the level
		 * @type {Bubble}
		 */
		this.bubbles = [];
		this.ais = [];

		this.status = "running"; // running, lost, won
		this.alarm = [];
		this.alarm[0] = 10;

		// Pause button
		let pauseButton = this.addObject(new Button(
			this.g,
			"⏸",
			g.roomWidth - 60,
			10,
			50,
			50,
			Settings.pause,
			false
		));
		pauseButton.setFontSize(16);
	}

	step() {
		// alarm system
		for(let i = 0; i < this.alarm.length; i++) {
			if(this.alarm[i] === undefined)
				continue;

			if(this.alarm[i] > 0)
				this.alarm[i]--;
			else
				this.alarmieren(i);
		}

		super.step();
	}

	draw() {
		//do nothing
	}

	// Adds bubble to room
	// TODO rename → should handle all bases
	addBubble(bubble) {
		this.bubbles.push(bubble);
		this.addObject(bubble);

		return bubble;
	}

	removeBubble(bubble) {
		// TODO datastructure
		for (var i = 0; i < this.g.room.bubbles.length; i++) {
			if (this.g.room.bubbles[i] === bubble) {
				this.g.room.bubbles.splice(i, 1);
				return true;
			}
		}

		console.error("Attempted to deleted bubble that is not in g.room.bubbles", bubble);
		return false;
	}

	surrender() {
		if (!confirm("Do you really want to give up?")) {
			return;
		}

		this.g.gotoRoom(this.returnRoom);
		Settings.unpause();
	}

	restart(prompt=false) {
		if (prompt && !confirm("Do you really want to give up?")) {
				return false;
		}

		this.g.gotoRoom(this.constructor);
		return true;
	}

	// TODO rename → timer
	alarmieren(nr) {
		switch(nr) {
			case 0:
				if(this.status == "running" && this.checkIfLost(1)) {
					this.status = "lost";
					this.g.showEndgame(false);
					this.g.progressManager.updateLevelStats(this.g.room.constructor.name, false);
				}
				this.alarm[0] = 300;

				break;

			default:
				console.log("Error: alarm has no function.");
				break;
		}
	}

	// Checks if team has already lost
	checkIfLost(team) {
		for(var i = 0; i < this.objects.length; i++) {
			if(this.objects[i] instanceof Jelly || this.objects[i] instanceof Base) {
				if(this.objects[i].team === team) {
					return false;
				}
			}
		}
		return true;
	}
}
