import Level from "./Level.js";
import Bubble from "../../objects/bases/Bubble.js";
import KI0 from "../../appEtc/KI0.js";
import KI2 from "../../appEtc/KI2.js";

export default class Level16 extends Level {
	constructor(g, returnRoom = undefined) {
		super(g, returnRoom);

		this.addObject(new KI2(this.g, 2));
		this.addObject(new KI0(this.g, 3));

		this.addBase(new Bubble(this.g, 128, 640, 1, 1, 40));
		this.addBase(new Bubble(this.g, 1000, 288, 3, 1));
		this.addBase(new Bubble(this.g, 736, 224, 3, 1));
		this.addBase(new Bubble(this.g, 1100, 544, 3, 1));
		this.addBase(new Bubble(this.g, 760, 650, 3, 1));
		this.addBase(new Bubble(this.g, 384, 300, 2, 1));
		this.addBase(new Bubble(this.g, 800, 480, 2 , 1));
		this.addBase(new Bubble(this.g, 100, 128, 2, 1));
		this.addBase(new Bubble(this.g, 1120, 200, 2, 1));
	}
}
