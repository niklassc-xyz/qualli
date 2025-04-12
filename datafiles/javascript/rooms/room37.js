import LevelRoom from "./LevelRoom.js";
import Bubble from "../objects/Bubble.js";
import KI0 from "../appEtc/KI0.js";
import ModDefend from "../appEtc/aiModules/ModDefend.js";

export default class room37 extends LevelRoom {
	constructor(g, returnRoom = undefined) {
		super(g);

		this.addObject(new KI0(this.g, 2));
		let ki1 = this.addObject(new KI0(this.g, 3));
		this.addObject(new KI0(this.g, 4));

		let mod1 = new ModDefend(g);
		ki1.modules.push(mod1);

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
