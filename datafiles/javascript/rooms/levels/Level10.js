import Level from "./Level.js";
import Actor from "../../Actor/Actor.js";
import Bubble from "../../objects/bases/Bubble.js";
import ModBubble0 from "../../Actor/AiModule/ModBubble0.js";

export default class Level10 extends Level {
	constructor(g, returnRoom = undefined) {
		super(g, returnRoom);

		const ai0 = this.addActor(new Actor(this.g, 2));
		ai0.addModule(new ModBubble0(this.g));

		const ai1 = this.addActor(new Actor(this.g, 3));
		ai1.addModule(new ModBubble0(this.g));

		const ai2 = this.addActor(new Actor(this.g, 4));
		ai2.addModule(new ModBubble0(this.g));

		this.addBase(new Bubble(this.g, 128, 640, 1, 1));
		this.addBase(new Bubble(this.g, 1000, 288, 2, 1));
		this.addBase(new Bubble(this.g, 736, 224, 3, 1));
		this.addBase(new Bubble(this.g, 1100, 544, 0, 2, 3));
		this.addBase(new Bubble(this.g, 760, 650, 4, 2, 15));
		this.addBase(new Bubble(this.g, 384, 300, 4, 1, 20));
		this.addBase(new Bubble(this.g, 800, 480, 0 , 1, 7));
		this.addBase(new Bubble(this.g, 100, 128, 4, 1, 20));
		this.addBase(new Bubble(this.g, 1120, 200, 0, 3));
	}
}
