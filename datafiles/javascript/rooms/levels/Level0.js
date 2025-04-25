import Level from "./Level.js";
import Actor from "../../Actor/Actor.js";
import Bubble from "../../objects/bases/Bubble.js";
import ModBubble0 from "../../Actor/AiModule/ModBubble0.js";


export default class Level0 extends Level {
	constructor(g, returnRoom = undefined) {
		super(g, returnRoom);

		const ai0 = this.addActor(new Actor(this.g, 2));
		ai0.addModule(new ModBubble0(this.g));

		this.addBase(new Bubble(this.g, 128, 640, 1, 3, 100));
		this.addBase(new Bubble(this.g, 1184, 288));
		this.addBase(new Bubble(this.g, 736, 224));
		this.addBase(new Bubble(this.g, 1024, 544));
		this.addBase(new Bubble(this.g, 160, 480));
		this.addBase(new Bubble(this.g, 384, 128));
		this.addBase(new Bubble(this.g, 544, 480));
		this.addBase(new Bubble(this.g, 64, 160));
		this.addBase(new Bubble(this.g, 1120, 128, 2, 2, 100));
	}
}
