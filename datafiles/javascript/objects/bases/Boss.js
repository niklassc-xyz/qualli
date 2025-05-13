import Base from "./Base.js";
import * as math from "../../parapluie/functions/math.js";
import Jelly from "../units/Jelly.js";

export default class Boss extends Base {
	constructor(g, x, y, team=0) {
		const width = 125;
		const height = 65;

		const sprite = g.resourceManager.getSpriteByPath("datafiles/sprites/shark.svg");
		super(g, x, y, width, height, sprite, team);

		this.spriteOriginal = this.sprite;
		this.spriteFlipped = this.g.resourceManager.getSpriteByPath("datafiles/sprites/sharkFlipped.svg");


		this.health = 100;
		this.energy = 100;
		this.chooseRandomTarget();
		this.targetSpeed = 7;
		this.setSpeed(this.targetSpeed);
		this.acceleration = 0.2;
	}

	step() {
		super.step();

		if (this.health < 100)
			this.health = Math.min(100, this.health+0.03);
		else
			this.energy += 0.03; // TODO

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

		// Energy
		this.g.painter.ctx.textBaseline = "middle";
		this.g.painter.ctx.textAlign = "center";
		this.g.painter.ctx.fillStyle = "rgba(245, 255, 245, 0.8)";
		this.g.painter.ctx.font = "18px fnt_Comforta_Bold";
		this.g.painter.ctx.fillText(Math.floor(this.energy), this.x, this.y);
	}

	chooseRandomTarget() {
		this.targetX = Math.random() * this.g.roomWidth;
		this.targetY = Math.random() * this.g.roomHeight;
	}

	attackRandom() {
		let n = Math.round(Math.random() * 50);
		n = Math.min(n, this.energy);
		this.energy -= n;

		
		// TODO add getter/randomGetter to Level.js
		const bases = this.g.room.baseManager.getBases();
		const ri = Math.floor(bases.length * Math.random());
		const target = bases[ri];

		for (let i = 0; i < n; i++) {
			const jelly = this.g.room.addObject(new Jelly(this.g, this.x, this.y, this.team, target, this));
			const jellyTargetDir = math.pointDirection(jelly.x, jelly.y, jelly.targetX, jelly.targetY)
			if (jellyTargetDir > 90 && jellyTargetDir < 270)
				jelly.sprite = this.spriteFlipped;
			else
				jelly.sprite = this.spriteOriginal;
		}
	}

	receiveUnits(n, team) {
		if (this.team === team) {
			this.units += n;
		} else {
			this.health = Math.max(0, this.health-n);
		}
	}
}
