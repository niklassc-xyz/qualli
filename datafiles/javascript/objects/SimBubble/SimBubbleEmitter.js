class SimBubbleEmitter extends IObjlistentry {
	// TODO use color class → implement rgba rgb colors
	// constructor(basecolor = [220, 220, 250], p = 0.1) {
	constructor(basecolor = [120, 210, 255], p = 0.1) {
		super();

		this.basecolor = basecolor;
		this.p = p;
	}

	step() {
		super.step();

		if (Math.random() < this.p) {
			let sourceX = roomWidth/2;
			let sourceWidth = roomWidth;
			
			// let x = Math.random() * roomWidth;
			let x = sourceX - sourceWidth + 2*Math.random()*sourceWidth;

			let r = Math.random() * 64 + 8;
			let y = roomHeight + r;

			// DEBUG
			// y -= 2*r;

			room.addObject(new SimBubble(x, y, r, this.basecolor));
		}
	}
}
