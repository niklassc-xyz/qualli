import SpriteEntity from "../../parapluie/objects/SpriteEntity.js";
import Colors from "../../appEtc/color/Colors.js";

export default class Base extends SpriteEntity {
	constructor(g, x, y, width, height, sprite, team = 0) {
		super(g, x, y, width, height, sprite);

		this.ox = this.width / 2;
		this.oy = this.height / 2;

		this.team = team;



		this.arriving = [];
		// TODO team management
		for (let i = 0; i < Colors.team.length; i++) {
			this.arriving[i] = 0;
		}
	}

	/**
	 * When units of value n arrive that belong to team team
	 *
	 * @param {number} n - [TODO:description]
	 * @param {number} team - [TODO:description]
	 */
	receiveJellies(n, team, source = undefined) {
		
	}


	/**
	 * Returns the total value of units whose target is this base
	 *
	 * @returns {number} Sum of value of the units whose target is this base
	 */
	getArrivingEnemy() {
		return 0;
	}
}
