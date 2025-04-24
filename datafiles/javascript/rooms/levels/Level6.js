import Level from "./Level.js";
import Actor from "../../Actor/Actor.js";
import Bubble from "../../objects/bases/Bubble.js";
import KI0 from "../../appEtc/KI0.js";

export default class Level6 extends Level {
	constructor(g, returnRoom = undefined) {
		super(g, returnRoom);

		this.addObject(new KI0(this.g, 2));
		this.addObject(new KI0(this.g, 3));
		this.addObject(new KI0(this.g, 4));


		let hMargin = 200;
		let vMargin = 150;

		this.addBase(new Bubble(this.g, hMargin, vMargin, 2, 3, 30));

		this.addBase(new Bubble(this.g, hMargin, g.roomHeight - vMargin, 1, 3, 30));

		this.addBase(new Bubble(this.g, g.roomWidth - hMargin, g.roomHeight - vMargin, 3, 3, 30));

		this.addBase(new Bubble(this.g, g.roomWidth - hMargin, vMargin, 4, 3, 30));

		this.addBase(new Bubble(this.g, g.roomWidth / 2, g.roomHeight / 2, 0, 1, 20));
	}
}
