import LevelRoom from "./LevelRoom.js";
import Bubble from "../objects/Bubble.js";
import KI1 from "../appEtc/KI1.js";

export default class room18 extends LevelRoom {
	constructor(){
		super();

		this.addObject(new KI1(2));

		let planetDistance = 200; // centre to cenre
		let itemsInRow = 6;

		// Calculate start margin in order to center the items block
		let rowWidth = (itemsInRow-1) * planetDistance;
		let startMargin = (roomWidth - rowWidth) / 2;

		for(let i = 0; i < 3; i++) {
			for(let j = 0; j < itemsInRow; j++) {
				let newTeam = (j < itemsInRow / 2) ? 1 : 2;
				let newSize = (i == 1) ? 2 : 1;
				this.addBubble(new Bubble(startMargin + j * planetDistance, 160 + i * planetDistance, newTeam, newSize, 10000));
			}
		}
	}
}
