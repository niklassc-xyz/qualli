import Object from "../engine/objects/Object.js";
import * as f from "../functions.js";

// Creates a bubbles
export default class BubbleSeed extends Object {
	constructor(g, delay, futureBubble) {
		super(g, futureBubble.x, futureBubble.y, futureBubble.width, futureBubble.height);

		this.futureBubble = futureBubble;
		this.delay = delay;
		this.timeAlive = 0;

		this.created = g.stepCount;
	}

	step() {
		super.step();
		this.timeAlive++;

		if (this.timeAlive >= this.delay) {
			this.g.room.addObject(this.futureBubble);
			this.g.room.bubbles.push(this.futureBubble); // TODO use addBubble method when implemented
			this.destroy();
		}
	}

	draw() {
		super.draw();

		// animation
		// TODO scale to size of seed
		// let scale = this.futureBubble.size;
		this.g.ctx.lineWidth = 5;
		let lineCount = 5;



		this.g.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
		let shiftedStepCount = this.g.stepCount + this.created; // Shift counter by creation time because otherwise all seed instances show exactly the same
		for(var i = 0; i < lineCount; i++){
			this.g.ctx.beginPath();
			this.g.ctx.arc(this.x, this.y, i * ((this.g.ctx.lineWidth-1)*2), (shiftedStepCount* (i*0.01+0.1)) + 1.25 * Math.PI, (shiftedStepCount*(i*0.01+0.1)) + 1.75 * Math.PI, false);
			this.g.ctx.stroke();
			this.g.ctx.beginPath();
			this.g.ctx.arc(this.x, this.y, this.g.ctx.lineWidth + i * ((this.g.ctx.lineWidth-1)*2), -(shiftedStepCount* (i*0.01+0.1)) + 1.25 * Math.PI, -(shiftedStepCount*(i*0.01+0.1)) + 1.75 * Math.PI, false);
			this.g.ctx.stroke();
		}


		// Background
		this.g.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
		f.drawCircle(this.g.ctx, this.x, this.y, 0.9*this.width/2, false);

		// Draw background of progress bar
		let circleRadius = 1.1 * this.width / 2;
		this.g.ctx.lineWidth = 3;
		this.g.ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
		f.drawCircle(this.g.ctx, this.x, this.y, circleRadius, true);
		

		// Draw progress bar of time left
		this.g.ctx.lineWidth = 3;
		this.g.ctx.strokeStyle = 'white';
		this.g.ctx.beginPath();
		this.g.ctx.arc(this.x,
			this.y,
			circleRadius,
			2.0 * Math.PI * (this.timeAlive/this.delay),
			2.0 * Math.PI);

		this.g.ctx.stroke();
	}
}
