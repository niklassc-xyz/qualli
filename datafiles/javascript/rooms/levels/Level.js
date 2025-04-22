import Room from "./../../parapluie/Room.js";
import Button from "../../parapluie/objects/util/Button.js";
import Jelly from "../../objects/Jelly.js";
import Base from "../../objects/bases/Base.js";
import BaseManager from "../../objects/bases/BaseManager.js";


// Abstract Class LevelRoom
// All levels should extend from this

export default class Level extends Room {
	static background = "datafiles/sprites/bg8FullHd.png";

	constructor(g, returnRoom = undefined) {
		super(g, returnRoom);

		if (this.constructor == Level) {
			throw new Error("Abstract classes can't be instantiated.");
		}

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
			() => { this.g.pause() },
			false
		));
		pauseButton.setFontSize(16);

		this.baseManager = this.addObject(new BaseManager(g));
	}

	step() {
		// TODO alarm system
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
		super.draw();


		if (this.status === "won") {
			this.g.painter.setFillStyle("#efaf00");
			this.g.painter.setStrokeStyle("black");
			this.g.painter.setLineWidth(1);
			this.g.painter.setFont("30px fnt_Comforta_Bold");

			const text = "Won";
			const textHeight = 20;
			console.log("Test");
			this.g.painter.fillText("Won 👑", this.g.roomWidth/2, this.g.roomHeight - textHeight)
			this.g.painter.strokeText("Won 👑", this.g.roomWidth/2, this.g.roomHeight - textHeight)
		}
	}

	surrender() {
		if (!confirm("Do you really want to give up?")) {
			return;
		}

		this.g.gotoRoom(this.returnRoom);
		this.g.unpause();
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
		for(var i = 0; i < this.entities.length; i++) {
			if(this.entities[i] instanceof Jelly || this.entities[i] instanceof Base) {
				if(this.entities[i].team === team) {
					return false;
				}
			}
		}
		return true;
	}

	addBase(base) {
		this.baseManager.registerBase(base);
		return this.addObject(base);
	}

	unregisterBase(base) {
		return this.baseManager.unregisterBase(base);
	}
}
