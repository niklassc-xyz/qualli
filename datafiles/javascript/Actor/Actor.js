import GameEntity from "../parapluie/objects/GameEntity.js";
import Colors from "../appEtc/color/Colors.js";

export default class Actor extends GameEntity {
	constructor(g, team) {
		super(g);
		this.team = team;

		this._modules = [];
	}

	step() {
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
}
