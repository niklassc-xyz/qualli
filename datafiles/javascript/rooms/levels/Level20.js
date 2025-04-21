import Level from "./Level.js";
import Bubble from "../../objects/Bubble.js";
import KI0 from "../../appEtc/KI0.js";
import Jelly from "../../objects/Jelly.js";

export default class Level20 extends Level {
	constructor(g, returnRoom = undefined) {
		super(g, returnRoom);

		this.addObject(new KI0(this.g, 2));

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
		let sum_team_1 = 0
		let sum_team_2 = 0
		
		const bases = this.g.room.baseManager.getBases();
		for(let i = 0; i < bases.length; i++) {
			if(bases[i].team == 1)
				sum_team_1++
			else if(bases[i].team == 2)
				sum_team_2++
		}

		// Stop supporting when team has no planets, otherwise game never ends
		if(sum_team_1 == 0 || sum_team_2 == 0)
			return 0

		if(sum_team_1 < sum_team_2)
			return 1
		else  if(sum_team_1 > sum_team_2)
			return 2
		return 0
	}
}
