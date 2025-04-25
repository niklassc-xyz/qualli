import Level from "./Level.js";
import Actor from "../../Actor/Actor.js";
import Bubble from "../../objects/bases/Bubble.js";
import ModBubble0 from "../../Actor/AiModule/ModBubble0.js";

export default class Level43 extends Level {
	constructor(g, returnRoom = undefined) {
		super(g, returnRoom);

		const ai0 = this.addActor(new Actor(this.g, 2));
		ai0.addModule(new ModBubble0(this.g));

		const ai1 = this.addActor(new Actor(this.g, 3));
		ai1.addModule(new ModBubble0(this.g));
		
		const ai2 = this.addActor(new Actor(this.g, 4));
		ai2.addModule(new ModBubble0(this.g));

		this.addBase(new Bubble(this.g, 640, 300, 0, 6)); // Central neutral hub (0 = neutral team)
		this.addBase(new Bubble(this.g, 440, 100, 1, 3)); // Player start
		this.addBase(new Bubble(this.g, 840, 100, 2, 3)); // AI 1 start
		this.addBase(new Bubble(this.g, 440, 500, 3, 3)); // AI 2 start
		this.addBase(new Bubble(this.g, 840, 500, 4, 3)); // AI 3 start

		this.addBase(new Bubble(this.g, 540, 200, 0, 2)); // Neutral minor node near player
		this.addBase(new Bubble(this.g, 740, 200, 0, 2)); // Neutral minor node near AI 1
		this.addBase(new Bubble(this.g, 540, 400, 0, 2)); // Neutral minor node near AI 2
		this.addBase(new Bubble(this.g, 740, 400, 0, 2)); // Neutral minor node near AI 3

		this.addBase(new Bubble(this.g, 640, 100, 0, 0.5)); // Mid neutral node between player and AI 1
		this.addBase(new Bubble(this.g, 440, 300, 0, 0.5)); // Mid neutral node between player and AI 2
		this.addBase(new Bubble(this.g, 840, 300, 0, 0.5)); // Mid neutral node between AI 1 and AI 3
		this.addBase(new Bubble(this.g, 640, 500, 0, 0.5)); // Mid neutral node between AI 2 and AI 3

	}
}
