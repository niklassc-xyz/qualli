import Room from "./../../parapluie/Room.js";
import Button from "../../parapluie/objects/util/Button.js";
import BaseManager from "../../objects/bases/BaseManager.js";
import Actor from "../../Actor/Actor.js";


// Abstract Class LevelRoom
// All levels should extend from this

export default class Level extends Room {
	static background = "datafiles/sprites/bg8FullHd.png";

	constructor(g, returnRoom = undefined) {
		super(g, returnRoom);

		if (this.constructor == Level) {
			throw new Error("Abstract classes can't be instantiated.");
		}

		this._actors = [];

		this.status = "running"; // running, lost, won

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

		this.addActor(new Actor(this.g, 1));
	}

	step() {
		if (this.status == "running") {
			const winner = this.checkGameOver();
			console.log(winner);
			if (winner !== false) {
				this.g.showEndgame(true)
				if (winner.team === 1) {
					this.status = "won";
					this.g.progressManager.updateLevelStats(this.constructor.name, true);
				} else {
					this.status = "lost";
					this.g.progressManager.updateLevelStats(this.constructor.name, false);
				}
			}
		}
	}

	// Checks if game is over and returns winner, false otherwise
	checkGameOver() {
		let winner;
		for (let i = 0; i < this._actors.length; i++) {
			if (!this._actors[i].lost) {
				if (typeof winner !== "undefined")
					return false;
				winner = this._actors[i];
			}

		}
		return winner;
	}

	draw() {
		super.draw();

		// Draw icons of actors
		for (let i = 0; i < this._actors.length; i++) {
			const x = (32 + i*48);
			this._actors[i].drawIcon(x, 32);
		}

		// When level ended, show lost/won
		if (this.status === "won") {
			this.g.painter.setFillStyle("#efaf00");
			this.g.painter.setStrokeStyle("black");
			this.g.painter.setLineWidth(1);
			this.g.painter.setFont("30px fnt_Comforta_Bold");

			const text = "Won";
			const textHeight = 20;
			this.g.painter.fillText("Won 👑", this.g.roomWidth/2, this.g.roomHeight - textHeight)
			this.g.painter.strokeText("Won 👑", this.g.roomWidth/2, this.g.roomHeight - textHeight)
		} else if (this.status === "lost") {
			this.g.painter.setFillStyle("#f4aaff");
			this.g.painter.setStrokeStyle("black");
			this.g.painter.setLineWidth(1);
			this.g.painter.setFont("30px fnt_Comforta_Bold");

			const text = "Won";
			const textHeight = 20;
			this.g.painter.fillText("Lost 🏳", this.g.roomWidth/2, this.g.roomHeight - textHeight)
			this.g.painter.strokeText("Lost 🏳", this.g.roomWidth/2, this.g.roomHeight - textHeight)

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

	addBase(base) {
		this.baseManager.registerBase(base);
		return this.addObject(base);
	}

	unregisterBase(base) {
		return this.baseManager.unregisterBase(base);
	}

	addActor(actor) {
		this._actors.push(actor);
		return this.addObject(actor);
	}
}
