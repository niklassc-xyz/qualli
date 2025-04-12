import LevelRoom from "./LevelRoom.js";
import Bubble from "../objects/Bubble.js";
import KI0 from "../appEtc/KI0.js";
import ModDefend from "../appEtc/aiModules/ModDefend.js";

export default class room38 extends LevelRoom {
	constructor(g, returnRoom = undefined) {
		super(g);

		let ai0 = this.addObject(new KI0(this.g, 2));
		let ai1 = this.addObject(new KI0(this.g, 3));
		let ai2 = this.addObject(new KI0(this.g, 4));

		let mod0 = new ModDefend(g);
		ai0.modules.push(mod0);
		let mod1 = new ModDefend(g);
		ai1.modules.push(mod1);
		let mod2 = new ModDefend(g);
		ai2.modules.push(mod2);

		let planetDistance = 200; // centre to centre
		let itemsInRow = 6;

		// Calculate start margin in order to center the items block
		let rowWidth = (itemsInRow-1) * planetDistance;
		let startMargin = (g.roomWidth - rowWidth) / 2;

		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < itemsInRow; j++) {
				this.addBubble(new Bubble(this.g, startMargin + j * planetDistance, 160 + i * planetDistance, (i*3+j) % 5, 1));
			}
		}
	}
}
