import Base from "./Base.js";
import * as math from "../../parapluie/functions/math.js";
import Jelly from "../Jelly.js";

export default class Boss extends Base {
	constructor(g, x, y, team=0) {
		const width = 100;
		const height = 50;
		const sprite = "datafiles/sprites/squid.svg";
		super(g, x, y, width, height, sprite, team);

		this.health = 100;
		this.chooseRandomTarget();
		this.setSpeed(3);
	}

	step() {
		super.step();

		// Randomly attack
		if (Math.random() < 0.002)
			this.attackRandom();

		// Turn towards target
		const dirToTarget = math.pointDirection(this.x, this.y, this.targetX, this.targetY);
		const turnSpeed = 2;
		const positiveTurnDistance = math.mMod(dirToTarget - this.direction, 360); // clockwise
		const negativeTurnDistance = math.mMod(this.direction - dirToTarget, 360); // anticlockwise
		if (positiveTurnDistance <= turnSpeed || negativeTurnDistance <= turnSpeed) {
			this.setDirection(dirToTarget);
		} else {
			if (positiveTurnDistance < negativeTurnDistance) {
				this.setDirection(this.direction + turnSpeed);
			} else {
				this.setDirection(this.direction - turnSpeed);
			}
		}

		if (math.distance(this.x, this.y, this.targetX, this.targetY) < 100)
			this.chooseRandomTarget();
	}

	draw() {
		super.draw();

		// Draw healthbar
		const barWidth = this.width;
		const barHeight = 4;
		this.g.painter.setFillStyle("red");
		this.g.painter.fillRect(this.x - barWidth/2, this.y - 42, barWidth, barHeight);
		this.g.painter.setFillStyle("#44ff77");
		this.g.painter.fillRect(this.x - barWidth/2, this.y - 42, barWidth*this.health/100, barHeight);
	}

	chooseRandomTarget() {
		this.targetX = Math.random() * this.g.roomWidth;
		this.targetY = Math.random() * this.g.roomHeight;
	}

	attackRandom() {
		const n = Math.round(Math.random() * 20);
		
		// TODO add getter/randomGetter to Level.js
		const bases = this.g.room.baseManager.getBases();
		const ri = Math.floor(bases.length * Math.random());
		const target = bases[ri];

		for (let i = 0; i < n; i++)
			this.g.room.addObject(new Jelly(this.g, this.x, this.y, this.team, target, this));
	}
}
