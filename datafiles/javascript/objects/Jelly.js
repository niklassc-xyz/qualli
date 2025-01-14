import SpriteObject from "../engine/objects/SpriteObject.js";
import * as g from "../globals.js";
import * as f from "../functions.js";
import IObjlistentry from "../appEtc/IObjlistentry.js";
import Colors from "../appEtc/color/Colors.js";
import Settings from "../engine/Settings.js";

export default class Jelly extends SpriteObject {
	// static audio = new Audio("../../sounds/2025_01_11_12_29_30.flac");
	// static audio = new Audio("2025_01_11_12_29_30.flac");

	/**
	 * [TODO:description]
	 *
	 * @param {number} x - [TODO:description]
	 * @param {number} y - [TODO:description]
	 * @param {number} team - [TODO:description]
	 * @param {Bubble} ziel - [TODO:description]
	 * @param {number} [size] - [TODO:description]
	 */
	// TODO swap target and ziel
	constructor(x, y, team, ziel, source, size=1) {
		// super(x, y, 32, 21, g.spr_Raumschiff[team]);
		super(x, y, 1, 1, g.spr_Raumschiff[team]);

		// let audio = new Audio("datafiles/sounds/2025_01_11_12_29_30.flac");
		// audio.play();

		g.room.addObject(this); // Move to Superclass
		this.source = source;

		this.team = team;
		this.ziel = ziel; // TODO rename
		this.size = size; // TODO separate damage and size → default damage can be size
		// this.width *= size;
		// this.height *= size;

		this.widthShould = 32 * this.size;
		this.heightShould = 21 * this.size;

		// Point that jelly is moving to initially when created, will adapt
		// direction gradually
		this.startX = x + (128 - Math.floor(Math.random() * 256)); // TODO rename
		this.startY = y + (128 - Math.floor(Math.random() * 256)); // TODO rename
		this.moveTowardsPoint(this.startX, this.startY, 2);

		this.targetX = this.ziel.x - this.ziel.ox + Math.random()*this.ziel.width;
		this.targetY = this.ziel.y - this.ziel.oy + Math.random()*this.ziel.height;

		this.ziel.arriving[this.team]++;

		// this.opt_swapScreen = 3; // TODO remove


		// TODO dont nest
		// TODO rename? → express intent, what it does (accelerator or something)
		// increases speed and corrects direction until it is done and then deletes itself
		// this reduces operations after getting to the targetSpeed and right direction
		class StartHelper extends IObjlistentry {
			constructor(parent, targetSpeed) {
				super();
				this.parent = parent;
				this.targetSpeed = targetSpeed;
				g.room.addObject(this);
			}

			draw() {}

			step() {
				// this.parent.sizeScalar = Math.min(1, this.parent.sizeScalar + 0.01);
				// this.parent.size = Math.min(this.parent.sizeShould, this.parent.size + 0.01);

				// TODO sometimes deleted before full size is reached
				this.parent.width = Math.min(this.parent.widthShould, this.parent.width + 2.5);
				// this.parent.height = Math.min(this.parent.heightShould, this.parent.height + 0.01); // TODO scale correctly
				this.parent.height = this.parent.width * this.parent.heightShould / this.parent.widthShould

				let acceleration = 0.03 + 0.4*Math.random();

				if(this.parent.speed < this.targetSpeed)
					this.parent.setSpeed(this.parent.speed + acceleration);

				let zDir = f.pointDirection(this.parent.x, this.parent.y, this.parent.targetX, this.parent.targetY);

				// TODO increase when large amounts are spawned
				let turnSpeed = 2 + 4*Math.random();

				let positiveTurnDistance = f.mMod(zDir - this.parent.direction, 360); // clockwise
				let negativeTurnDistance = f.mMod(this.parent.direction - zDir, 360); // anticlockwise

				if(positiveTurnDistance <= turnSpeed || negativeTurnDistance <= turnSpeed)
					this.parent.setDirection(zDir);
				else
					if(positiveTurnDistance < negativeTurnDistance) {
						this.parent.setDirection(this.parent.direction + turnSpeed);
					} else {
						this.parent.setDirection(this.parent.direction - turnSpeed);
					}

				if(Math.abs(zDir - this.parent.direction) <= turnSpeed && Math.abs(this.parent.speed - this.targetSpeed) <= acceleration && this.parent.width === this.parent.widthShould) {
					// TODO is this deleted when parents is deleted
					this.parent.setSpeed(this.targetSpeed);
					this.parent.setDirection(zDir);
					this.destroy();
				}
			}
		}

		new StartHelper(this, 4 + 2 * Math.random());
	}

	step(){
		super.step();

		// Check if jelly collided with target
		if (f.rectangle_in_rectangle(
			this.x - (this.width/2),
			this.y - (this.height/2),
			this.x + (this.width/2),
			this.y + (this.height/2),
			this.ziel.x - (this.ziel.width/2),
			this.ziel.y - (this.ziel.height/2),
			this.ziel.x + (this.ziel.width/2),
			this.ziel.y + (this.ziel.height/2)
		)){
			this.destroy();

			this.ziel.receiveJellies(this.size, this.team, this.source);
		}

		// Check if jelly collided with target
		// TODO check whole jelly width not just center
		// console.log(this.x, this.ox, this.y, this.oy);
		// console.log(this.ziel.x, this.ziel.ox, this.ziel.);


		// // TODO fix
		// if (pointInCircle(
		// 	this.x + this.ox,
		// 	this.y + this.oy,
		// 	this.ziel.x + this.ziel.ox,
		// 	this.ziel.y + this.ziel.oy,
		// 	this.ziel.width / 2
		// )){
		// 	this.destroy();

		// 	this.ziel.receiveJellies(this.size, this.team);
		// }
	}

	draw() {
		// TODO fix this
		// TODO rotation
		// TODO origin
		// TODO ellipsis
		// Jelly glow
		if (Settings.getJellyGlow()) {
			let c = Colors.team[this.team];
			g.ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, 0.025`;
			let maxr = Math.max(this.widthD, this.heightD);

			f.draw_circle(this.xD, this.yD, maxr * 2.7, false);
			f.draw_circle(this.xD, this.yD, maxr * 2.0, false);
		}

		super.draw();
	}

	destroy() {
		super.destroy();

		this.ziel.arriving[this.team]--;
	}
}
