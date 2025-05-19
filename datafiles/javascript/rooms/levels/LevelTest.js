import Level from "./Level.js";
import Actor from "../../Actor/Actor.js";
import Bubble from "../../objects/bases/Bubble.js";
import BubbleTemp from "../../objects/bases/BubbleTemp/BubbleTemp.js";
import Boss from "../../objects/bases/Boss.js";
import HarpoonBaseBroken from "../../objects/bases/HarpoonBaseBroken.js";

import ModBubble0 from "../../Actor/AiModule/ModBubble0.js";
import ModBubble1 from "../../Actor/AiModule/ModBubble1.js";
import ModBubble2 from "../../Actor/AiModule/ModBubble2.js";

import ModFleeTemp from "../../Actor/AiModule/ModFleeTemp.js";
import ModAutoSend from "../../Actor/AiModule/ModAutoSend.js";


// TODO boss svg should be rendered


export default class LevelTest extends Level {
	constructor(g, returnRoom = undefined) {
		super(g, returnRoom);

		this.background = "datafiles/sprites/bg_1.png";


		this.addBase(new Boss(this.g, 100, 100, 2));

		let harpoonBases = [];
		harpoonBases.push(this.addBase(new HarpoonBaseBroken(this.g, 150, 160)));
		harpoonBases.push(this.addBase(new HarpoonBaseBroken(this.g, 150, 560)));

		const ttl = 700;
		// const units = 60;
		const units = 600;
		this.addBase(new BubbleTemp(this.g, 450, 360, 1, 2, units, ttl, false));

		const ai0 = this.addActor(new Actor(this.g, 2));
		ai0.addModule(new ModBubble0(this.g));
		ai0.addModule(new ModFleeTemp(this.g));


		// Pyramid
		// const margin = 10;
		let pyramidMembers = [];
		const startY = 90;
		const width = 550;
		const startX = 1280 - width - 60;
		const height = 540;
		const bubblesInStartRow = 5;

		const dx = width / (bubblesInStartRow-1);
		const dy = height / (bubblesInStartRow-1);
		// Iterate columns
		for (let i = 0; i < bubblesInStartRow; i++) {
			const bubblesInRow = bubblesInStartRow - i;

			const marginY = (height - (dy*(bubblesInRow-1))) / 2;
			const bubbleX = startX + i * dx;

			// Iterate rows in column
			for (let j = 0; j < bubblesInRow; j++) {
				const bubbleY = startY + marginY + (j*dy);
				const team = 0;

				// TODO decrease how quickly units are produced → keep size
				const base = this.addBase(new Bubble(this.g, bubbleX, bubbleY, team, 0.7, 10));
				pyramidMembers.push(base);
				// base.width *= 1.5;
				// base.height *= 1.5;
			}
		}
			
		// TODO ensure this is the player
		this._actors[0].addModule(new ModAutoSend(this.g, pyramidMembers, harpoonBases));
	}
}
