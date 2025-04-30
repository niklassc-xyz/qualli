import Level from "./Level.js";
import Actor from "../../Actor/Actor.js";
import Bubble from "../../objects/bases/Bubble.js";
import ModBubble0 from "../../Actor/AiModule/ModBubble0.js";
import Jelly from "../../objects/Jelly.js";

export default class Level20 extends Level {
	constructor(g, returnRoom = undefined) {
		super(g, returnRoom);

		const ai0 = this.addActor(new Actor(this.g, 2));
		ai0.addModule(new ModBubble0(this.g));

		let planetDistance = 200; // centre to centre
		let itemsInRow = 6;

		// Calculate start margin in order to center the items block
		let rowWidth = (itemsInRow-1) * planetDistance;
		let startMargin = (g.roomWidth - rowWidth) / 2;

		for(let i = 0; i < 3; i++) {
			for(let j = 0; j < itemsInRow; j++) {
				let newTeam = (j < itemsInRow / 2) ? 1 : 2;
				let newSize = (i == 1) ? 2 : 1;
				this.addBase(new Bubble(this.g, startMargin + j * planetDistance, 160 + i * planetDistance, newTeam, newSize, 100));
			}
		}

		// TODO camelCase
		this.supportSrcX = g.roomWidth / 2
	}

	step() {
		super.step();

		// Create jellies to support losing team
		// Random walk
		this.supportSrcX += 10 - Math.random() * 20
		if(this.supportSrcX < 0)
			this.supportSrcX = this.g.roomWidth - 1
		else if(this.supportSrcX >= this.g.roomWidth)
			this.supportSrcX = 0

		let losingTeam = this.getLosingTeamByPlanet()
		if (losingTeam != 0) {
			const bases = this.g.room.baseManager.getBases();
			let supportBubbleTarget = bases[Math.floor(Math.random() * bases.length)]
			this.g.room.addObject(new Jelly(this.g, this.supportSrcX, -100, losingTeam, supportBubbleTarget));
		}
	}

	// Return team that has less planets
	getLosingTeamByPlanet() {
		let sumTeam1 = 0
		let sumTeam2 = 0
		
		const bases = this.g.room.baseManager.getBases();
		for(let i = 0; i < bases.length; i++) {
			if(bases[i].team == 1)
				sumTeam1++
			else if(bases[i].team == 2)
				sumTeam2++
		}

		// Stop supporting when team has no planets, otherwise game never ends
		if(sumTeam1 == 0 || sumTeam2 == 0)
			return 0

		if(sumTeam1 < sumTeam2)
			return 1
		else  if(sumTeam1 > sumTeam2)
			return 2
		return 0
	}
}
