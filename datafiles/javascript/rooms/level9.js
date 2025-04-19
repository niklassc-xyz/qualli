import LevelRoom from "./LevelRoom.js";
import Bubble from "../objects/Bubble.js";
import KI0 from "../appEtc/KI0.js";

export default class Level9 extends LevelRoom {
	constructor(g, returnRoom = undefined) {
		super(g, returnRoom);

		this.addObject(new KI0(this.g, 2));
		this.addObject(new KI0(this.g, 3));

		this.addBase(new Bubble(this.g, 128, 640, 2, 3, 75));
		this.addBase(new Bubble(this.g, 1000, 288, 0, 1));
		this.addBase(new Bubble(this.g, 736, 224, 1, 1));
		this.addBase(new Bubble(this.g, 1100, 544, 0, 2));
		this.addBase(new Bubble(this.g, 760, 650, 1, 1));
		this.addBase(new Bubble(this.g, 384, 300, 0, 1));
		this.addBase(new Bubble(this.g, 800, 480, 1 , 1));
		this.addBase(new Bubble(this.g, 100, 128, 3, 3, 75));
		this.addBase(new Bubble(this.g, 1120, 200, 1, 1));
	}
}
