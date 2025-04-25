import Level from "./Level.js";
import Actor from "../../Actor/Actor.js";
import ModFleeTemp from "../../appEtc/aiModules/ModFleeTemp.js";
import Bubble from "../../objects/bases/Bubble.js";
import BubbleTemp from "../../objects/bases/BubbleTemp/BubbleTemp.js";
import Boss from "../../objects/bases/Boss.js";

import ModBubble0 from "../../Actor/AiModule/ModBubble0.js";
import ModBubble1 from "../../Actor/AiModule/ModBubble1.js";
import ModBubble2 from "../../Actor/AiModule/ModBubble2.js";


export default class LevelTest extends Level {
	constructor(g, returnRoom = undefined) {
		super(g, returnRoom);

		this.addBase(new BubbleTemp(this.g, 640, 360, 1, 3, 100));
		this.addBase(new BubbleTemp(this.g, 1000, 100, 1, 2, 10));
		this.addBase(new BubbleTemp(this.g, 100, 600, 1, 2, 10));

		this.addBase(new Bubble(this.g, 1200, 600, 2, 1, 100));
		this.addBase(new Bubble(this.g, 100, 100, 0, 2, 25));

		this.addBase(new Boss(this.g, 100, 100, 2));

		const ai0 = this.addActor(new Actor(this.g, 2));
		ai0.addModule(new ModBubble0(this.g));
	}
}
