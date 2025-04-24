import GameEntity from "../parapluie/objects/GameEntity.js";
import Colors from "../appEtc/color/Colors.js";
import Jelly from "../objects/Jelly.js";
import Base from "../objects/bases/Base.js";

export default class Actor extends GameEntity {
	constructor(g, team) {
		super(g);
		this.team = team;

		this.lost = false;
		this._modules = [];
	}

	step() {
		if (this.lost)
			return;

		if (this.checkIfLost()) {
			this.lost = true;
			return;
		}

		for (let i = 0; i < this._modules.length; i++)
			this._modules[i].stepModule();
	}

	// TODO x,y
	drawIcon(x, y, r=16) {
		this.g.painter.setFillStyle(Colors.team[this.team].cRgba());
		this.g.painter.setStrokeStyle("rgba(50, 50, 50, 0.6)");
		let linew = 2;
		this.g.painter.setLineWidth(linew);
		this.g.painter.fillCircle(x, y, r);
		this.g.painter.strokeCircle(x, y, r);

		this.g.painter.setFillStyle("rgba(50, 50, 50, 0.9)");
		this.g.painter.setFont("16px fnt_Comforta_Light");
		this.g.painter.fillText(this.team, x, y);

		// Show when Actor lost
		if (this.lost) {
			this.g.painter.setLineWidth(3);
			this.g.painter.setStrokeStyle("#b30");
			this.g.painter.strokeLine(x-r, y-r, x+r, y+r);
			this.g.painter.strokeLine(x-r, y+r, x+r, y-r);
		}

		// Modules
		const mr = r/2;
		const mMargin = 2;
		for (let i = 0; i < this._modules.length; i++) {
			// this._modules[i].drawIcon(x, y + (2*mr)*(i+1), mr);
			this._modules[i].drawIcon(x, y + r + mr + (i*2*mr) + (i+1)*mMargin, mr);
		}
	}

	addModule(module) {
		module.actor = this;
		module.team = this.team;
		this._modules.push(module);
	}

	// Checks if Actor has lost the game
	checkIfLost() {
		// Check if Actor owns Bases
		if (this.g.room.baseManager.getBasesByTeam(this.team).length !== 0)
			return false;

		// TODO do this better
		// Check if Actors has active jellies
		const entities = this.g.room.entities;
		for (let i = 0; i < entities; i++) {
			if (entities[i] instanceof Jelly) {
				if (entities[i].team === this.team)
					return false;
			}
		}

		return true;
	}
}
