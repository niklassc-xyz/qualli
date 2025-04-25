import Level from "./Level.js";
import Actor from "../../Actor/Actor.js";
import Bubble from "../../objects/bases/Bubble.js";
import ModBubble0 from "../../Actor/AiModule/ModBubble0.js";

export default class Level2 extends Level {
	constructor(g, returnRoom = undefined) {
		super(g, returnRoom);

		const ai0 = this.addActor(new Actor(this.g, 2));
		ai0.addModule(new ModBubble0(this.g));
		const ai1 = this.addActor(new Actor(this.g, 3));
		ai1.addModule(new ModBubble0(this.g));
		const ai2 = this.addActor(new Actor(this.g, 4));
		ai2.addModule(new ModBubble0(this.g));

		this.addBase(new Bubble(this.g, 128, 640, 1, 2, 100));
		this.addBase(new Bubble(this.g, 1184, 288));
		this.addBase(new Bubble(this.g, 736, 224));
		this.addBase(new Bubble(this.g, 1024, 544, 4, 1, 150));
		this.addBase(new Bubble(this.g, 160, 480));
		this.addBase(new Bubble(this.g, 384, 128));
		this.addBase(new Bubble(this.g, 544, 480));
		this.addBase(new Bubble(this.g, 64, 160, 3, 2, 100));
		this.addBase(new Bubble(this.g, 1120, 128, 2, 2, 100));
	}
}
