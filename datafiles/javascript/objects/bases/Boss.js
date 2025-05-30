import Base from "./Base.js";
import HarpoonBase from "./HarpoonBase.js";
import * as math from "../../parapluie/functions/math.js";
import DiffuseMissile from "../units/DiffuseMissile.js";
import Colors from "../../appEtc/color/Colors.js";

export default class Boss extends Base {
	constructor(g, x, y, team=0) {
		const width = 125 * 1.2;
		const height = 65 * 1.2;

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
		// const turnSpeed = 7;
		const turnSpeed = 3;
		const positiveTurnDistance = math.mMod(dirToTarget - this.direction, 360); // clockwise
		const negativeTurnDistance = math.mMod(this.direction - dirToTarget, 360); // anticlockwise
		if (positiveTurnDistance <= turnSpeed || negativeTurnDistance <= turnSpeed) {
			this.setDirection(dirToTarget);
		} else {
			this.setSpeed(Math.max(5.5, this.speed - 1.3*this.acceleration));
			if (positiveTurnDistance < negativeTurnDistance) {
				this.setDirection(this.direction + turnSpeed);
			} else {
				this.setDirection(this.direction - turnSpeed);
			}
		}

		if (math.distance(this.x, this.y, this.targetX, this.targetY) < 300)
			this.chooseRandomTarget();

		// Attack harpoon bases
		const harpoonBases = this.g.room.baseManager.getBases([HarpoonBase]);
		if (harpoonBases.length > 0 && Math.random() < 0.05) {
			const target = math.chooseRandom(harpoonBases);
			this.sendUnits(target, 1);
		}
	}

	draw() {
		super.draw();

		// Draw healthbar
		const barWidth = this.width;
		const barHeight = 4;
		this.g.painter.setFillStyle(Colors.healthbarRed.cRgb());
		this.g.painter.fillRect(this.x - barWidth/2, this.y - 42, barWidth, barHeight);
		this.g.painter.setFillStyle(Colors.healthbarGreen.cRgb());
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

		const bubbles = this.g.room.baseManager.getBubbles();
		const ri = Math.floor(bubbles.length * Math.random());
		const target = bubbles[ri];
		this.sendUnits(target, n);
	}

	sendUnits(base, n) {
		if (n > this.units) {
			console.warn("Tried attacking with more units than boss has.")
			n = this.units
		}

		this.units -= n

		for (let i = 0; i < n; i++) {
			const missileX = this.x;
			const missileY = this.y;
			const jellyTargetDir = math.pointDirection(missileX, missileY, base.x, base.y)
			let missileSprite;
			if (jellyTargetDir > 90 && jellyTargetDir < 270)
				missileSprite = this.spriteFlipped;
			else
				missileSprite = this.spriteOriginal;

			const missileWidth = 32;
			const missileHeight = 21;

			const missile = this.g.room.addObject(new DiffuseMissile(this.g,
			                                                         missileX,
			                                                         missileY,
			                                                         missileSprite,
			                                                         missileWidth,
			                                                         missileHeight,
			                                                         this.team,
			                                                         base,
			                                                         this));
			missile.targetSpeed = this.speed * 1.1;
			missile.setDirectionSpeed(this.direction, this.speed * 1.1);
		}
	}

	receiveUnits(n, team) {
		if (this.destroyed)
			return;

		if (this.team === team) {
			this.units += n;
		} else {
			this.health -= n;
		}

		if (this.health <= 0)
			this.destroy();
	}
}
