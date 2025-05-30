import Level from "./Level.js";
import Actor from "../../Actor/Actor.js";
import Bubble from "../../objects/bases/Bubble.js";
import ModBubble0 from "../../Actor/AiModule/ModBubble0.js";

export default class Level6 extends Level {
	constructor(g, returnRoom = undefined) {
		super(g, returnRoom);

		const ai0 = this.addActor(new Actor(this.g, 2));
		ai0.addModule(new ModBubble0(this.g));

		const ai1 = this.addActor(new Actor(this.g, 3));
		ai1.addModule(new ModBubble0(this.g));

		const ai2 = this.addActor(new Actor(this.g, 4));
		ai2.addModule(new ModBubble0(this.g));


		let hMargin = 200;
		let vMargin = 150;

		this.addBase(new Bubble(this.g, hMargin, vMargin, 2, 3, 30));

		this.addBase(new Bubble(this.g, hMargin, g.roomHeight - vMargin, 1, 3, 30));

		this.addBase(new Bubble(this.g, g.roomWidth - hMargin, g.roomHeight - vMargin, 3, 3, 30));

		this.addBase(new Bubble(this.g, g.roomWidth - hMargin, vMargin, 4, 3, 30));

		this.addBase(new Bubble(this.g, g.roomWidth / 2, g.roomHeight / 2, 0, 1, 20));
	}
}
