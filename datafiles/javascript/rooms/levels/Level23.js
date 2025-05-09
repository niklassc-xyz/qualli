import Level from "./Level.js";
import Actor from "../../Actor/Actor.js";
import Bubble from "../../objects/bases/Bubble.js";
import ModBubble0 from "../../Actor/AiModule/ModBubble0.js";

export default class Level23 extends Level {
	constructor(g, returnRoom = undefined) {
		super(g, returnRoom);

		const ai0 = this.addActor(new Actor(this.g, 2));
		ai0.addModule(new ModBubble0(this.g));

		let planetDistance = 160; // centre to centre
		let itemsInRow = 6;

		// Calculate start margin in order to center the items block
		let rowWidth = (itemsInRow-1) * planetDistance;
		let startMargin = (g.roomWidth - rowWidth) / 2;


		let jellyAmount = 750
		let bases = [];
		for(let i = 0; i < 3; i++) {
			for(let j = 0; j < itemsInRow; j++) {
				let newTeam = 1
				// TODO const
				let newSize = (i == 1) ? 2 : 1;
				bases.push(this.addBase(new Bubble(this.g, startMargin + j * planetDistance, 200 + i * planetDistance, newTeam, newSize, jellyAmount)));
			}
		}

		let pushOut = 70
		jellyAmount = Math.ceil((jellyAmount * 14 / 4) * 1.05)

		for (const i of [0, 5, 12, 17]) {
			bases[i].team = 2
			bases[i].units = jellyAmount
		}
		bases[0].x -= pushOut
		bases[0].y -= pushOut

		bases[5].x += pushOut
		bases[5].y -= pushOut

		bases[12].x -= pushOut
		bases[12].y += pushOut

		bases[17].x += pushOut
		bases[17].y += pushOut

	}
}
