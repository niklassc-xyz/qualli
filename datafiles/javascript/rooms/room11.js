import LevelRoom from "./LevelRoom.js";
import Bubble from "../objects/Bubble.js";
import KI0 from "../appEtc/KI0.js";

export default class room11 extends LevelRoom {
	constructor(g, returnRoom = undefined) {
		super(g);

		this.addObject(new KI0(this.g, 2));
		this.addObject(new KI0(this.g, 3));
		this.addObject(new KI0(this.g, 4));

		this.addBubble(new Bubble(this.g, 128, 640, 1, 1, 20));
		this.addBubble(new Bubble(this.g, 1000, 288, 0, 1));
		this.addBubble(new Bubble(this.g, 736, 224, 0, 1));
		this.addBubble(new Bubble(this.g, 1100, 544, 4, 2));
		this.addBubble(new Bubble(this.g, 760, 650, 4, 1));
		this.addBubble(new Bubble(this.g, 384, 300, 3, 1));
		this.addBubble(new Bubble(this.g, 800, 480, 3 , 1));
		this.addBubble(new Bubble(this.g, 100, 128, 2, 1, 30));
		this.addBubble(new Bubble(this.g, 1120, 200, 2, 3));
	}
}
