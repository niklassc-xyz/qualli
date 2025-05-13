import Unit from "./Unit.js";
import * as math from "../../parapluie/functions/math.js";

export default class DiffuseMissile extends Unit {
	// Diffusely moves towards target
	// startDiffusion: Interval around start (x|y). The missile will chose a 
	// random point in this area to point to initially. If set to undefined,
	// missile will point to target immediately
	constructor(g, x, y, sprite, targetWidth, targetHeight, team, target, source, unitValue=1, startDiffusion=undefined) {
		const initialWidth = 1
		const initialHeight = 1
		super(g, x, y, initialWidth, initialHeight, sprite, team, target, source, unitValue);


		this._targetWidth = targetWidth;
		this._targetHeight = targetHeight;

		// Point that missile is moving to initially when created, will adapt
		// direction gradually
		if (typeof startDiffusion === "undefined") {
			this.startX = target.x;
			this.startY = target.y;
		} else {
			this.startX = x + (startDiffusion/2 - Math.floor(Math.random() * startDiffusion)); // TODO rename
			this.startY = y + (startDiffusion/2 - Math.floor(Math.random() * startDiffusion)); // TODO rename
		}
		this.moveTowardsPoint(this.startX, this.startY, 2);

		// TODO target size?
		this.targetXOffset = -this.target.ox + Math.random()*this.target.width;
		this.targetYOffset = -this.target.oy + Math.random()*this.target.height;
		this._setTargetCoordinates();
		this.targetSpeed = 4 + 2*Math.random();

		this.target.arriving[this.team]++;
	}

	step() {
		this._setTargetCoordinates();

		super.step();

		// Grow
		this.width = Math.min(this._targetWidth, this.width + 2.5);
		this.height = this.width * this._targetHeight / this._targetWidth;

		// Accelerate
		let acceleration = 0.03 + 0.4*Math.random();
		this.setSpeed(Math.min(this.speed + acceleration, this.targetSpeed));

		// Turn towards target
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
		if (Math.abs(zDir - this.direction) <= turnSpeed && Math.abs(this.speed - this.targetSpeed) <= acceleration && this.width === this._targetWidth) {
			this.setSpeed(this.targetSpeed);
			this.setDirection(zDir);
		}
	}

	// Updates actual target coordinates (e.g. if target moves), random offset
	// stays the same
	_setTargetCoordinates() {
		this.targetX = this.target.x + this.targetXOffset;
		this.targetY = this.target.y + this.targetYOffset;
	}
}
