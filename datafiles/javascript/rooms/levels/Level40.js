import Level from "./Level.js";
import Actor from "../../Actor/Actor.js";
import Bubble from "../../objects/bases/Bubble.js";
import ModBubble2 from "../../Actor/AiModule/ModBubble2.js";
import ModDefendBubble from "../../Actor/AiModule/ModDefendBubble.js";

// Puzzle

export default class Level40 extends Level {
	constructor(g, returnRoom = undefined) {
		super(g, returnRoom);

		const ai0 = this.addActor(new Actor(this.g, 2));
		ai0.addModule(new ModBubble2(this.g));

		const ai1 = this.addActor(new Actor(this.g, 3));
		ai1.addModule(new ModDefendBubble(this.g));

		let planetDistance = 200; // centre to centre
		let itemsInRow = 6;

		// Calculate start margin in order to center the items block
		let rowWidth = (itemsInRow-1) * planetDistance;
		let startMargin = (g.roomWidth - rowWidth) / 2;

		let amount = 10
		let bases = [];
		for(let i = 0; i < 3; i++) {
			for(let j = 0; j < itemsInRow; j++) {
				if (j > 2) {
					continue;
				}

				let newTeam = 0;
				bases.push(this.addBase(new Bubble(this.g, startMargin + j * planetDistance, 160 + i * planetDistance, newTeam, 1, amount)));
			}
		}

		bases[1].team = 2;

		bases[2].team = 3;
		bases[2].units = 5000;
		
		bases[3].team = 1;
		bases[3].units = 300;
		
		// Large bubbles on the right
		let newUnits = 50;
		this.addBase(new Bubble(this.g, startMargin + 4 * planetDistance, 160 + 0 * planetDistance, 2, 7, newUnits));
		this.addBase(new Bubble(this.g, startMargin + 4 * planetDistance, 160 + 2 * planetDistance, 3, 7, newUnits));
	}
}
