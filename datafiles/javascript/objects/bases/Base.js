import SpriteEntity from "../../parapluie/objects/SpriteEntity.js";
import Colors from "../../appEtc/color/Colors.js";
import * as collision from "../../parapluie/functions/collision.js";

export default class Base extends SpriteEntity {
	constructor(g, x, y, width, height, sprite, team = 0) {
		super(g, x, y, width, height, sprite);

		this.ox = this.width / 2;
		this.oy = this.height / 2;

		this.team = team;

		// Whether this base can be selected as a source / target
		this.selectionSource = true;
		this.selectionTarget = true;


		// TODO → make target private → setter for target, where arriving is updated
		this.arriving = [];
		// TODO team management
		for (let i = 0; i < Colors.team.length; i++) {
			this.arriving[i] = 0;
		}
	}

	onAdd() {
		super.onAdd();
		this._registerClickable();
	}

	clickUp() {
		this.g.room.baseManager.notifyClickUp(this);
	}

	clickDown() {
		this.g.room.baseManager.notifyClickDown(this);
	}

	destroy() {
		super.destroy();

		this.g.room.unregisterBase(this);
	}

	// Do action from this to `base`
	action(base) {

	}

	/**
	 * When units of value n arrive that belong to team team
	 *
	 * @param {number} n - [TODO:description]
	 * @param {number} team - [TODO:description]
	 */
	receiveUnits(n, team, source = undefined) {
		
	}

	/**
	 * Returns the total value of units whose target is this base
	 *
	 * @returns {number} Sum of value of the units whose target is this base
	 */
	getArrivingEnemy() {
		let sum = 0;
		for (let i = 0; i < this.arriving.length; i++) {
			if (i === this.team)
				continue;
			sum += this.arriving[i];
		}

		return sum;
	}

	// Called every step by BaseManager when this base is selected
	stepSelected() {

	}

	// Called every step by BaseManager when this base is selected
	drawSelected() {
		// Draw arrow from selected to cursor
		let r = this.width / 2;
		let inputX = this.g.input.getX();
		let inputY = this.g.input.getY();

		if (!collision.pointInCircle(inputX, inputY, this.x, this.y, r)) {
			let dx = inputX - this.x;
			let dy = inputY - this.y;
			let dist = Math.sqrt(dx**2 + dy**2);
			let ndx = dx / dist;
			let ndy = dy / dist;
			let startx = this.x + ndx*r;
			let starty = this.y + ndy*r;
			this.g.painter.ctx.strokeStyle = "white";
			this.g.painter.ctx.lineWidth = 3;
			this.g.painter.strokeLine(startx, starty, inputX, inputY);
		}

		// Highlight selected bubble
		const circleAnimationDuration = 20;
		const circleAnimationFrame = this.g.stepCount % circleAnimationDuration;

		this.g.painter.ctx.lineWidth = 2;
		this.g.painter.ctx.strokeStyle = "white";
		for(let i = 0; i < 5 + Math.abs(circleAnimationFrame - circleAnimationDuration/2); i+=3) {
			this.g.painter.strokeCircle(
				this.x,
				this.y,
				this.width / 2 + i,
			);
		}
	}
}
