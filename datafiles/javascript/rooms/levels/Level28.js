import Level from "./Level.js";
import Actor from "../../Actor/Actor.js";
import BubbleTemp from "../../objects/bases/BubbleTemp/BubbleTemp.js";
import ModBubble0 from "../../Actor/AiModule/ModBubble0.js";

export default class Level28 extends Level {
	constructor(g, returnRoom = undefined) {
		super(g, returnRoom);

		const ai0 = this.addActor(new Actor(this.g, 2));
		ai0.addModule(new ModBubble0(this.g));

		const ai1 = this.addActor(new Actor(this.g, 3));
		ai1.addModule(new ModBubble0(this.g));

		let planetDistance = 200; // centre to centre
		let itemsInRow = 6;

		// Calculate start margin in order to center the items block
		let rowWidth = (itemsInRow-1) * planetDistance;
		let startMargin = (g.roomWidth - rowWidth) / 2;

		for(let i = 0; i < 3; i++) {
			for(let j = 0; j < itemsInRow; j++) {
				let newTeam = (j < itemsInRow / 3) ? 1 : (j < 2 * (itemsInRow / 3) ? 2 : 3);
				let newSize = (i == 1) ? 2 : 1;
				let newUnits = (newTeam == 1) ? 40 : 70;
				this.addBase(new BubbleTemp(this.g, startMargin + j * planetDistance, 160 + i * planetDistance, newTeam, newSize, newUnits));
			}
		}
	}
}
