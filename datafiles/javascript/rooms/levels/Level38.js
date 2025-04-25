import Level from "./Level.js";
import Actor from "../../Actor/Actor.js";
import Bubble from "../../objects/bases/Bubble.js";
import ModBubble0 from "../../Actor/AiModule/ModBubble0.js";
import ModDefendBubble from "../../Actor/AiModule/ModDefendBubble.js";


export default class Level38 extends Level {
	constructor(g, returnRoom = undefined) {
		super(g, returnRoom);

		const ai0 = this.addActor(new Actor(this.g, 2));
		ai0.addModule(new ModBubble0(this.g));
		ai0.addModule(new ModDefendBubble(this.g));

		const ai1 = this.addActor(new Actor(this.g, 3));
		ai1.addModule(new ModBubble0(this.g));
		ai1.addModule(new ModDefendBubble(this.g));

		const ai2 = this.addActor(new Actor(this.g, 4));
		ai2.addModule(new ModBubble0(this.g));
		ai2.addModule(new ModDefendBubble(this.g));

		let planetDistance = 200; // centre to centre
		let itemsInRow = 6;

		// Calculate start margin in order to center the items block
		let rowWidth = (itemsInRow-1) * planetDistance;
		let startMargin = (g.roomWidth - rowWidth) / 2;

		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < itemsInRow; j++) {
				this.addBase(new Bubble(this.g, startMargin + j * planetDistance, 160 + i * planetDistance, (i*3+j) % 5, 1));
			}
		}
	}
}
