import SpriteObject from "../../engine/objects/SpriteObject.js";
import LevelRoom from "../../rooms/LevelRoom.js";
import * as f from "../../functions.js";
import LinkedList from "../../engine/LinkedList/LinkedList.js";

export default class SimBubble extends SpriteObject {
	// TODO Is this ever cleared? On room change?
	static all = [];

	constructor(g, x, y, r, basecolor) {
		let padding = 8;
		const sprite = new OffscreenCanvas(2*padding + 2*r, 2*padding + 2*r);
		const ctx = sprite.getContext("2d");

		super(g, x, y, 2*r, 2*r, sprite);
		this.ox = r + padding; // TODO separate sprite and hitbox
		this.oy = r + padding;


		// ctx.fillStyle = "yellow";
		// ctx.fillRect(0, 0, r, r);

		this.r = r;
		this.basecolor = basecolor;
		this.generateSprite(sprite);

		SimBubble.all.push(this);

		this.ascendAcel = 0.0002 * r;




		let speed = 1 + Math.random();
		let directionDiff = 30; // Degrees in which direction is random
		let direction = 270 - directionDiff + 2*(directionDiff*Math.random());

		this.createQueue = new LinkedList();


		// console.log(direction);

		this.setDirectionSpeed(direction, speed);
		// console.log(this.speed, this.direction);
	}

	generateSprite(canvas) {
		// TODO scale

		// const offscreen = new OffscreenCanvas(w, h);
		const ctx = canvas.getContext("2d");
		ctx.translate(8, 8); // TODO do padding properly

		ctx.strokeStyle = "rgba(220, 220, 250, 0.6)";
		ctx.lineWidth = 4;
		f.drawCircle(ctx, this.r, this.r, this.r, true);


		ctx.fillStyle = "rgba(220, 220, 250, 0.1)";
		f.drawCircle(ctx, this.r, this.r, this.r, false);


		let lineNum = 5;
		for (let i = 1; i < lineNum; i++) {
			let alpha = 0.05 + 0.6 * (1 - i/lineNum)

			ctx.strokeStyle = `rgba(${this.basecolor[0]}, ${this.basecolor[1]}, ${this.basecolor[2]}, ${alpha})`;
			let lineWidth = 1;
			ctx.lineWidth = lineWidth;
			f.drawCircle(ctx, this.r, this.r, this.r - i*(lineWidth*2), true);
			f.drawCircle(ctx, this.r, this.r, this.r + i*(lineWidth*2), true);
		}

		
		ctx.translate(-8, -8); // TODO
		// ctx.strokeStyle = "red";
		// ctx.lineWidth = 1;
		// ctx.strokeRect(0, 0, canvas.width, canvas.height);
	}

	destroy() {
		super.destroy();

		// Delete from SimBubble.all
		for (let i = 0; i < SimBubble.all.length; i++) {
			let other = SimBubble.all[i];
			if (other === this) {
				SimBubble.all.splice(i, 1);
				break;
			}
		}
	}

	step() {
		super.step();

		this.setVspeed(this.vspeed - this.ascendAcel);

		if (this.g.room instanceof LevelRoom) {
			this.setVspeed(this.vspeed - 40*this.ascendAcel);
		}

		if (this.y < -this.height + this.oy)
			this.destroy();

		// Create jellies
		if (!this.createQueue.isEmpty()) {
			let parameter = this.createQueue.removeFirst();
			let newJelly = new SimJelly(this.g, parameter[0], parameter[1], parameter[2], parameter[3]);
			newJelly.setSpeeds(newJelly.hspeed + this.hspeed, newJelly.vspeed + this.vspeed);
		}

		// Collision with cursor
		// TODO move to input?
		let ax1 = this.x - this.width/2;
		let ay1 = this.y - this.height/2
		let ax2 = this.x + this.width/2;
		let ay2 = this.y + this.height/2

		if (f.point_in_rectangle(this.g.input.x, this.g.input.y, ax1, ay1, ax2, ay2)) {
			let a = 0.5;
			if (this.x < this.g.input.x) {
				this.setHspeed(this.hspeed - a);
			} else {
				this.setHspeed(this.hspeed + a);
			}

			if (this.y < this.g.input.y) {
				this.setVspeed(this.vspeed - a);
			} else {
				this.setVspeed(this.vspeed + a);
			}
		}

		// Collide with other SimBubbles
		for (let i = 0; i < SimBubble.all.length; i++) {
			let other = SimBubble.all[i];
			if (other === this) {
				continue;
			}

			// if (Math.random() < 0.001) {
			// console.log(other);
			// }

			// TODO check circle in cirlce
			// if (circleInCircle(this.x, this.y, this.width/2,
			//                    i.x, i.y, i.width/2)) {

			let bx1 = other.x - other.width/2;
			let by1 = other.y - other.height/2
			let bx2 = other.x + other.width/2;
			let by2 = other.y + other.height/2

			if (f.rectangle_in_rectangle(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2)) {
				// console.log("COLLLISION");
				let aHoriz = 0.05;
				if (this.x < other.x) {
					this.setHspeed(this.hspeed - aHoriz);
					other.setHspeed(other.hspeed + aHoriz);
				} else {
					this.setHspeed(this.hspeed + aHoriz);
					other.setHspeed(other.hspeed - aHoriz);
				}
				let aVert = 0.05;
				if (this.y < other.y) {
					this.setVspeed(this.vspeed - aVert);
					other.setVspeed(other.vspeed + aVert*0.2); // slower down
				} else {
					this.setVspeed(this.vspeed + aVert*0.2); // slower down
					other.setVspeed(other.vspeed - aVert);
				}
			}

		}
	}

	// TODO remove
	// Attack bubble other
	attack(other, amount) {
		for (let i = 0; i < amount; i++) {
			// let newJelly = new Jelly(this.x, this.y, this.team, other)
			// let team = 1; // TODO
			// let team = Math.floor(Colors.team.length * Math.random());
			// team = 1;
			// TODO team object
			let team = 1 + Math.floor(4 * Math.random());
			console.log("Create with team", team);
			this.createQueue.addLast([this.x, this.y, team, other])
		}
	}
}
