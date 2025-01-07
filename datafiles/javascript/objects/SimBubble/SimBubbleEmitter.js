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

			let base = new Color(this.basecolor[0], this.basecolor[1], this.basecolor[2]);
			let black = new Color(0, 0, 50);
			let white = new Color(255, 255, 255);

			let darker = base.getMix(black, 0.5);
			let lighter = base.getMix(white, 0.5);

			let c = [base, darker, lighter];
			let ci = Math.floor(Math.random() * c.length);

			let carr = [c[ci].r, c[ci].g, c[ci].b];

			// room.addObject(new SimBubble(x, y, r, this.basecolor));
			room.addObject(new SimBubble(x, y, r, carr));
		}
	}
}
