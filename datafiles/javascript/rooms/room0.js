import LevelRoom from "./LevelRoom.js";
import KI0 from "../appEtc/KI0.js";
import Bubble from "../objects/Bubble.js";


export default class room0 extends LevelRoom {
	constructor(g, returnRoom = undefined) {
		super(g);

		this.addObject(new KI0(this.g, 2));

		this.addBubble(new Bubble(this.g, 128, 640, 1, 3, 100));
		this.addBubble(new Bubble(this.g, 1184, 288));
		this.addBubble(new Bubble(this.g, 736, 224));
		this.addBubble(new Bubble(this.g, 1024, 544));
		this.addBubble(new Bubble(this.g, 160, 480));
		this.addBubble(new Bubble(this.g, 384, 128));
		this.addBubble(new Bubble(this.g, 544, 480));
		this.addBubble(new Bubble(this.g, 64, 160));
		this.addBubble(new Bubble(this.g, 1120, 128, 2, 2, 100));
	}
}
