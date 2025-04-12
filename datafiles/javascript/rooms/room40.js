import LevelRoom from "./LevelRoom.js";
import Bubble from "../objects/Bubble.js";
import ModDefend from "../appEtc/aiModules/ModDefend.js";
import KI2 from "../appEtc/KI2.js";
import KI3 from "../appEtc/KI3.js";

// Puzzle

export default class room40 extends LevelRoom {
	constructor(g, returnRoom = undefined) {
		super(g);

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
		for(let i = 0; i < 3; i++) {
			for(let j = 0; j < itemsInRow; j++) {
				if (j > 2) {
					continue;
				}

				let newTeam = 0;
				this.addBubble(new Bubble(this.g, startMargin + j * planetDistance, 160 + i * planetDistance, newTeam, 1, amount));
			}
		}

		this.bubbles[1].team = 2;

		this.bubbles[2].team = 3;
		this.bubbles[2].units = 5000;
		
		this.bubbles[3].team = 1;
		this.bubbles[3].units = 300;
		
		// Large bubbles on the right
		let newUnits = 50;
		this.addBubble(new Bubble(this.g, startMargin + 4 * planetDistance, 160 + 0 * planetDistance, 2, 7, newUnits));
		this.addBubble(new Bubble(this.g, startMargin + 4 * planetDistance, 160 + 2 * planetDistance, 3, 7, newUnits));
	}
}
