import SpriteEntity from "../parapluie/objects/SpriteEntity.js";
import GameEntity from "../parapluie/objects/GameEntity.js";
import Colors from "../appEtc/color/Colors.js";
import * as math from "../parapluie/functions/math.js";
import * as collision from "../parapluie/functions/collision.js";

export default class Jelly extends SpriteEntity {
	/**
	 * [TODO:description]
	 *
	 * @param {number} x - [TODO:description]
	 * @param {number} y - [TODO:description]
	 * @param {number} team - [TODO:description]
	 * @param {Bubble} target - [TODO:description]
	 * @param {number} [size] - [TODO:description]
	 */
	constructor(g, x, y, team, target, source, size=1) {
		let sprite;
		switch (team) {
			case 1:
				sprite = "datafiles/sprites/qualleRed.png";
				break;
			case 2:
				sprite = "datafiles/sprites/qualleBlue.png";
				break;
			case 3:
				sprite = "datafiles/sprites/qualleGreen.png";
				break;
			case 4:
				sprite = "datafiles/sprites/qualleYellow.png";
				break;
			default:
				throw new Error(`Tried creating Jelly with unsupported team (${team})`);
		}

		super(g, x, y, 1, 1, sprite);

		this.source = source;

		this.team = team;
		this.target = target;
		this.size = size; // TODO separate damage and size → default damage can be size

		this.widthShould = 32 * this.size;
		this.heightShould = 21 * this.size;

		// Point that jelly is moving to initially when created, will adapt
		// direction gradually
		this.startX = x + (128 - Math.floor(Math.random() * 256)); // TODO rename
		this.startY = y + (128 - Math.floor(Math.random() * 256)); // TODO rename
		this.moveTowardsPoint(this.startX, this.startY, 2);

		// TODO target size?
		this.targetXOffset = -this.target.ox + Math.random()*this.target.width;
		this.targetYOffset = -this.target.oy + Math.random()*this.target.height;
		this._setTargetCoordinates();
		this.targetSpeed = 4 + 2*Math.random();

		this.target.arriving[this.team]++;
	}

	step() {
		super.step();
		this._setTargetCoordinates();

		// Check if jelly collided with target
		if (collision.rectangleInRectangle(
			this.x - (this.width/2),
			this.y - (this.height/2),
			this.x + (this.width/2),
			this.y + (this.height/2),
			this.target.x - (this.target.width/2),
			this.target.y - (this.target.height/2),
			this.target.x + (this.target.width/2),
			this.target.y + (this.target.height/2)
		)) {
			this.destroy();

			this.target.receiveJellies(this.size, this.team, this.source);
		}


		this.width = Math.min(this.widthShould, this.width + 2.5);
		this.height = this.width * this.heightShould / this.widthShould;
		let acceleration = 0.03 + 0.4*Math.random();
		if(this.speed < this.targetSpeed)
			this.setSpeed(this.speed + acceleration);

		let zDir = math.pointDirection(this.x, this.y, this.targetX, this.targetY);
		// TODO increase when large amounts are spawned
		let turnSpeed = 2 + 4*Math.random();
		let positiveTurnDistance = math.mMod(zDir - this.direction, 360); // clockwise
		let negativeTurnDistance = math.mMod(this.direction - zDir, 360); // anticlockwise
		if (positiveTurnDistance <= turnSpeed || negativeTurnDistance <= turnSpeed) {
			this.setDirection(zDir);
		} else {
			if (positiveTurnDistance < negativeTurnDistance) {
				this.setDirection(this.direction + turnSpeed);
			} else {
				this.setDirection(this.direction - turnSpeed);
			}
		}

		if (Math.abs(zDir - this.direction) <= turnSpeed && Math.abs(this.speed - this.targetSpeed) <= acceleration && this.width === this.widthShould) {
			// TODO is this deleted when parentJelly is deleted
			this.setSpeed(this.targetSpeed);
			this.setDirection(zDir);
		}
	}

	draw() {
		// TODO fix this
		// TODO rotation
		// TODO origin
		// TODO ellipsis
		// Jelly glow
		if (this.g.settings.getJellyGlow()) {
			let c = Colors.team[this.team];
			this.g.painter.ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, 0.025`;
			let maxr = Math.max(this.width, this.height);

			this.g.painter.fillCircle(this.x, this.y, maxr * 2.7);
			this.g.painter.fillCircle(this.x, this.y, maxr * 2.0);
		}

		// Draw target DEBUG
		if (this.g.getDebug()) {
			this.g.painter.setStrokeStyle("red");
			this.g.painter.setLineWidth(2);
			this.g.painter.strokeCross(this.targetX, this.targetY, 6);
		}

		super.draw();
	}

	// Updates actual target coordinates (e.g. if target moves), random offset
	// stays the same
	_setTargetCoordinates() {
		this.targetX = this.target.x + this.targetXOffset;
		this.targetY = this.target.y + this.targetYOffset;
	}

	destroy() {
		super.destroy();

		this.target.arriving[this.team]--;
	}
}
