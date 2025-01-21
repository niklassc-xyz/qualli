import LevelRoom from "./LevelRoom.js";
import Bubble from "../objects/Bubble.js";
import KI0 from "../appEtc/KI0.js";

export default class room6 extends LevelRoom {
	constructor(g) {
		super(g);

		this.addObject(new KI0(this.g, 2));
		this.addObject(new KI0(this.g, 3));
		this.addObject(new KI0(this.g, 4));


		let hMargin = 200;
		let vMargin = 150;

		this.addBubble(new Bubble(this.g, hMargin, vMargin, 2, 3, 30));

		this.addBubble(new Bubble(this.g, hMargin, g.roomHeight - vMargin, 1, 3, 30));

		this.addBubble(new Bubble(this.g, g.roomWidth - hMargin, g.roomHeight - vMargin, 3, 3, 30));

		this.addBubble(new Bubble(this.g, g.roomWidth - hMargin, vMargin, 4, 3, 30));

		this.addBubble(new Bubble(this.g, g.roomWidth / 2, g.roomHeight / 2, 0, 1, 20));
	}
}
