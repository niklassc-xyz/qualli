import Base from "./Base.js";
import * as math from "../../parapluie/functions/math.js";
import Jelly from "../Jelly.js";

export default class Boss extends Base {
	constructor(g, x, y, team=0) {
		const width = 125;
		const height = 65;

		const sprite = g.resourceManager.getSpriteByPath("datafiles/sprites/shark.svg");
		super(g, x, y, width, height, sprite, team);

		this.spriteOriginal = this.sprite;
		this.spriteFlipped = this.g.resourceManager.getSpriteByPath("datafiles/sprites/sharkFlipped.svg");


		this.health = 100;
		this.chooseRandomTarget();
		this.targetSpeed = 7;
		this.setSpeed(this.targetSpeed);
		this.acceleration = 0.2;
	}

	step() {
		super.step();

		if (this.direction > 90 && this.direction < 270)
			this.sprite = this.spriteFlipped;
		else
			this.sprite = this.spriteOriginal;

		// Accelerate
		if (this.speed < this.targetSpeed)
			this.setSpeed(Math.min(this.speed + this.acceleration, this.targetSpeed));

		// Randomly attack
		if (Math.random() < 0.004)
			this.attackRandom();

		// Turn towards target
		const dirToTarget = math.pointDirection(this.x, this.y, this.targetX, this.targetY);
		const turnSpeed = 7;
		const positiveTurnDistance = math.mMod(dirToTarget - this.direction, 360); // clockwise
		const negativeTurnDistance = math.mMod(this.direction - dirToTarget, 360); // anticlockwise
		if (positiveTurnDistance <= turnSpeed || negativeTurnDistance <= turnSpeed) {
			this.setDirection(dirToTarget);
		} else {
			this.setSpeed(Math.max(0.1, this.speed - 1.6*this.acceleration));
			if (positiveTurnDistance < negativeTurnDistance) {
				this.setDirection(this.direction + turnSpeed);
			} else {
				this.setDirection(this.direction - turnSpeed);
			}
		}

		if (math.distance(this.x, this.y, this.targetX, this.targetY) < 300)
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

		for (let i = 0; i < n; i++) {
			const jelly = this.g.room.addObject(new Jelly(this.g, this.x, this.y, this.team, target, this));
			jelly.sprite = this.spriteOriginal;
		}
	}
}
