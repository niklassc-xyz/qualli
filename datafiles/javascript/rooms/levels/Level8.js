import Level from "./Level.js";
import Actor from "../../Actor/Actor.js";
import Bubble from "../../objects/bases/Bubble.js";
import ModBubble0 from "../../Actor/AiModule/ModBubble0.js";

export default class Level8 extends Level {
	constructor(g, returnRoom = undefined) {
		super(g, returnRoom);

		const ai0 = this.addActor(new Actor(this.g, 2));
		ai0.addModule(new ModBubble0(this.g));

		this.addBase(new Bubble(this.g, 128, 640, 1, 1));
		this.addBase(new Bubble(this.g, 1000, 288, 0, 1));
		this.addBase(new Bubble(this.g, 736, 224, 0, 1));
		this.addBase(new Bubble(this.g, 1100, 544, 0, 2));
		this.addBase(new Bubble(this.g, 760, 650, 0, 1));
		this.addBase(new Bubble(this.g, 384, 300, 0, 1));
		this.addBase(new Bubble(this.g, 800, 480, 0 , 1));
		this.addBase(new Bubble(this.g, 100, 128, 1, 1));
		this.addBase(new Bubble(this.g, 1120, 200, 2, 2, 100));
	}
}
