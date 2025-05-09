import Level from "./Level.js";
import Actor from "../../Actor/Actor.js";
import Bubble from "../../objects/bases/Bubble.js";
import BubbleTemp from "../../objects/bases/BubbleTemp/BubbleTemp.js";
import ModBubble0 from "../../Actor/AiModule/ModBubble0.js";
import ModFleeTemp from "../../Actor/AiModule/ModFleeTemp.js";

export default class Level43 extends Level {
	constructor(g, returnRoom = undefined) {
		super(g, returnRoom);

		const ai0 = this.addActor(new Actor(this.g, 2));
		ai0.addModule(new ModBubble0(this.g));
		ai0.addModule(new ModFleeTemp(this.g));

		const ai1 = this.addActor(new Actor(this.g, 3));
		ai1.addModule(new ModBubble0(this.g));
		ai1.addModule(new ModFleeTemp(this.g));
		
		const ai2 = this.addActor(new Actor(this.g, 4));
		ai2.addModule(new ModBubble0(this.g));
		ai2.addModule(new ModFleeTemp(this.g));


		this.addBase(new BubbleTemp(this.g, 640, 360, 0, 6, 50, 500)); // Central neutral bubble

		this.addBase(new Bubble(this.g, 250, 160, 1, 3)); // Player start
		this.addBase(new Bubble(this.g, 990, 160, 2, 3)); // AI 0 start (top left)
		this.addBase(new Bubble(this.g, 250, 560, 3, 3)); // AI 1 start (rop right
		this.addBase(new Bubble(this.g, 990, 560, 4, 3)); // AI 2 start

		this.addBase(new Bubble(this.g, 490, 210, 0, 2)); // Neutral medium bubble top left
		this.addBase(new Bubble(this.g, 790, 210, 0, 2)); // Neutral medium bubble top right
		this.addBase(new Bubble(this.g, 490, 510, 0, 2)); // Neutral medium bubble bottom left
		this.addBase(new Bubble(this.g, 790, 510, 0, 2)); // Neutral medium bubble bottom right

		this.addBase(new Bubble(this.g, 640, 70, 0, 0.5));  // Small neutral bubble between top
		this.addBase(new Bubble(this.g, 340, 360, 0, 0.5)); // Small neutral bubble between left
		this.addBase(new Bubble(this.g, 940, 360, 0, 0.5)); // Small neutral bubble between right
		this.addBase(new Bubble(this.g, 640, 650, 0, 0.5)); // Small neutral bubble between bottom
	}
}
