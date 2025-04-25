import Level from "./Level.js";
import Actor from "../../Actor/Actor.js";
import Bubble from "../../objects/bases/Bubble.js";
import ModBubble0 from "../../Actor/AiModule/ModBubble0.js";
import ModBubble1 from "../../Actor/AiModule/ModBubble1.js";

export default class Level14 extends Level {
	constructor(g, returnRoom = undefined) {
		super(g, returnRoom);

		const ai0 = this.addActor(new Actor(this.g, 2));
		ai0.addModule(new ModBubble1(this.g));

		const ai1 = this.addActor(new Actor(this.g, 3));
		ai1.addModule(new ModBubble0(this.g));

		this.addBase(new Bubble(this.g, 128, 640, 1, 1, 60));
		this.addBase(new Bubble(this.g, 1000, 288, 3, 3, 30));
		this.addBase(new Bubble(this.g, 736, 224, 3, 2, 30));
		this.addBase(new Bubble(this.g, 1100, 544, 2, 1, 10));
		this.addBase(new Bubble(this.g, 760, 650, 2, 1, 10));
		this.addBase(new Bubble(this.g, 384, 300, 2, 1, 10));
		this.addBase(new Bubble(this.g, 800, 480, 2 , 1, 10));
		this.addBase(new Bubble(this.g, 100, 128, 2, 1, 10));
		this.addBase(new Bubble(this.g, 1120, 200, 2, 1, 10));
	}
}
