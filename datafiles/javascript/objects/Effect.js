// TODO move to effects

export default class Effect extends Entity {
	constructor(g, x, y, ttl) {
		super(g, x, y, 0, 0);
		this.totalTtl = ttl;
		this.ttl = ttl;
		// this.x;
		// this.y;
	}
	
	step() {
		super.step();

		this.ttl--;

		if (this.ttl <= 0) {
			this.destroy();
		}
	}
}
