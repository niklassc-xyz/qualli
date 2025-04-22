import Level from "./Level.js";
import Bubble from "../../objects/bases/Bubble.js";
import ModDefend from "../../appEtc/aiModules/ModDefend.js";
import KI2 from "../../appEtc/KI2.js";
import KI3 from "../../appEtc/KI3.js";

// Puzzle

export default class Level40 extends Level {
	constructor(g, returnRoom = undefined) {
		super(g, returnRoom);

		this.addObject(new KI2(this.g, 2));
		let ai1 = this.addObject(new KI3(this.g, 3));

		let mod1 = new ModDefend(g);
		ai1.modules.push(mod1);

		let planetDistance = 200; // centre to centre
		let itemsInRow = 6;

		// Calculate start margin in order to center the items block
		let rowWidth = (itemsInRow-1) * planetDistance;
		let startMargin = (g.roomWidth - rowWidth) / 2;

		let amount = 10
		let bases = [];
		for(let i = 0; i < 3; i++) {
			for(let j = 0; j < itemsInRow; j++) {
				if (j > 2) {
					continue;
				}

				let newTeam = 0;
				bases.push(this.addBase(new Bubble(this.g, startMargin + j * planetDistance, 160 + i * planetDistance, newTeam, 1, amount)));
			}
		}

		bases[1].team = 2;

		bases[2].team = 3;
		bases[2].units = 5000;
		
		bases[3].team = 1;
		bases[3].units = 300;
		
		// Large bubbles on the right
		let newUnits = 50;
		this.addBase(new Bubble(this.g, startMargin + 4 * planetDistance, 160 + 0 * planetDistance, 2, 7, newUnits));
		this.addBase(new Bubble(this.g, startMargin + 4 * planetDistance, 160 + 2 * planetDistance, 3, 7, newUnits));
	}
}
