import Level from "./Level.js";
import Actor from "../../Actor/Actor.js";
import Bubble from "../../objects/bases/Bubble.js";
import ModBubble0 from "../../Actor/AiModule/ModBubble0.js";

export default class Level11 extends Level {
	constructor(g, returnRoom = undefined) {
		super(g, returnRoom);

		const ai0 = this.addActor(new Actor(this.g, 2));
		ai0.addModule(new ModBubble0(this.g));

		const ai1 = this.addActor(new Actor(this.g, 3));
		ai1.addModule(new ModBubble0(this.g));

		const ai2 = this.addActor(new Actor(this.g, 4));
		ai2.addModule(new ModBubble0(this.g));

		this.addBase(new Bubble(this.g, 128, 640, 1, 1, 20));
		this.addBase(new Bubble(this.g, 1000, 288, 0, 1));
		this.addBase(new Bubble(this.g, 736, 224, 0, 1));
		this.addBase(new Bubble(this.g, 1100, 544, 4, 2));
		this.addBase(new Bubble(this.g, 760, 650, 4, 1));
		this.addBase(new Bubble(this.g, 384, 300, 3, 1));
		this.addBase(new Bubble(this.g, 800, 480, 3 , 1));
		this.addBase(new Bubble(this.g, 100, 128, 2, 1, 30));
		this.addBase(new Bubble(this.g, 1120, 200, 2, 3));
	}
}
