import Level from "./Level.js";
import Actor from "../../Actor/Actor.js";
import Bubble from "../../objects/bases/Bubble.js";
import BubbleTemp from "../../objects/bases/BubbleTemp/BubbleTemp.js";
import ModBubble2 from "../../Actor/AiModule/ModBubble2.js";
import ModFleeTemp from "../../Actor/AiModule/ModFleeTemp.js";

export default class Level36 extends Level {
	constructor(g, returnRoom = undefined) {
		super(g, returnRoom);

		const ai0 = this.addActor(new Actor(this.g, 2));
		ai0.addModule(new ModBubble2(this.g));
		ai0.addModule(new ModFleeTemp(this.g));

		const ai1 = this.addActor(new Actor(this.g, 3));
		ai1.addModule(new ModBubble2(this.g));
		ai1.addModule(new ModFleeTemp(this.g));


		let planetDistance = 200; // centre to centre
		let itemsInRow = 6;

		// Calculate start margin in order to center the items block
		let rowWidth = (itemsInRow-1) * planetDistance;
		let startMargin = (g.roomWidth - rowWidth) / 2;

		let amount = 10
		let bases = [];
		for(let i = 0; i < 3; i++)
			for(let j = 0; j < itemsInRow; j++) {
				if (j > 2) {
					continue;
				}

				let newTeam = j + 1
				bases.push(this.addBase(new Bubble(this.g, startMargin + j * planetDistance, 160 + i * planetDistance, newTeam, 1, amount)));
			}
		
		bases[3].team = 1;
		bases[3].units = 300;
		
		let newUnits = 9.5 * amount;
		this.addBase(new BubbleTemp(this.g, startMargin + 4 * planetDistance, 160 + 0 * planetDistance, 2, 7, newUnits, 400));
		this.addBase(new BubbleTemp(this.g, startMargin + 4 * planetDistance, 160 + 2 * planetDistance, 3, 7, newUnits, 400));
	}
}
