import SpriteEntity from "../parapluie/objects/SpriteEntity.js";
import * as globals from "../globals.js";

// TODO remove?

export default class SimJelly extends SpriteEntity {
	// TODO Is this ever cleared? On room change?
	static all = [];

	constructor(g, x, y, team, ziel, size=1) {
		super(g, x, y, 32, 21, globals.spr_Raumschiff[team]);
		SimJelly.all.push(this);

		room.addObject(this); // TODO Move to Superclass, or remove?

		this.team = team;
		this.ziel = ziel; // TODO rename
		this.size = size;
		this.width *= size;
		this.height *= size;

		// Point that jelly is moving to initially when created, will adapt
		// direction gradually
		this.startX = x + (128 - Math.floor(Math.random() * 256)); // TODO rename
		this.startY = y + (128 - Math.floor(Math.random() * 256)); // TODO rename
		this.moveTowardsPoint(this.startX, this.startY, 2);

		this.targetX = this.ziel.x - this.ziel.ox + Math.random()*this.ziel.width;
		this.targetY = this.ziel.y - this.ziel.oy + Math.random()*this.ziel.height;

		// TODO dont nest
		// TODO rename? → express intent, what it does (accelerator or something)
		// increases speed and corrects direction until it is done and then deletes itself
		// this reduces operations after getting to the targetSpeed and right direction
		class StartHelper extends GameEntity {
			constructor(g, parent, targetSpeed) {
				super(g);
				this.parent = parent;
				this.targetSpeed = targetSpeed;
				room.addObject(this);
			}

			step() {
				super.step();

				let acceleration = 0.03 + 0.4*Math.random();

				if(this.parent.speed < this.targetSpeed)
					this.parent.setSpeed(this.parent.speed + acceleration);

				let zDir = pointDirection(this.parent.x, this.parent.y, this.parent.targetX, this.parent.targetY);

				// TODO increase when large amounts are spawned
				let turnSpeed = 2 + 4*Math.random();

				let positiveTurnDistance = mMod(zDir - this.parent.direction, 360); // clockwise
				let negativeTurnDistance = mMod(this.parent.direction - zDir, 360); // anticlockwise

				if(positiveTurnDistance <= turnSpeed || negativeTurnDistance <= turnSpeed)
					this.parent.setDirection(zDir);
				else
					if(positiveTurnDistance < negativeTurnDistance) {
						this.parent.setDirection(this.parent.direction + turnSpeed);
					} else {
						this.parent.setDirection(this.parent.direction - turnSpeed);
					}

				if(Math.abs(zDir - this.parent.direction) <= turnSpeed && Math.abs(this.parent.speed - this.targetSpeed) <= acceleration) {
					this.parent.setSpeed(this.targetSpeed);
					this.parent.setDirection(zDir);
					// this.destroy();
				}

				if (this.parent.ziel.isOutsideRoom()) {
					this.destroy();
				}
			}
		}

		new StartHelper(g, this, 4 + 2 * Math.random());
	}

	step(){
		super.step();

		if (this.isOutsideRoom()) {
			this.destroy();
		}
		if (room instanceof LevelRoom) {
			this.setSpeed(this.speed + 0.6);
		}


		// Check if jelly collided with target
		if (rectangle_in_rectangle(
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

			// this.ziel.receiveJellies(this.size, this.team);
		}
	}

	draw() {
		// TODO fix this
		// TODO rotation
		// TODO origin
		// TODO ellipsis
		let c = Colors.team[this.team];
		this.g.ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, 0.025`;
		let maxr = Math.max(this.width, this.height);

		drawCircle(this.g.ctx, this.x, this.y, maxr * 2.7, false);
		drawCircle(this.g.ctx, this.x, this.y, maxr * 2.0, false);

		super.draw();
	}

	destroy() {
		super.destroy();

		// Delete from SimJelly.all
		for (let i = 0; i < SimJelly.all.length; i++) {
			let other = SimJelly.all[i];
			if (other === this) {
				SimJelly.all.splice(i, 1);
				break;
			}
		}
	}
}
