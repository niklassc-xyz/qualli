class room15 extends LevelRoom {
	constructor() {
		super();

		this.addObject(new KI1(2));
		this.addObject(new KI0(3));

		this.addBubble(new Bubble(128, 640, 1, 1, 40));
		this.addBubble(new Bubble(1000, 288, 3, 1));
		this.addBubble(new Bubble(736, 224, 3, 1));
		this.addBubble(new Bubble(1100, 544, 3, 1));
		this.addBubble(new Bubble(760, 650, 3, 1));
		this.addBubble(new Bubble(384, 300, 2, 1));
		this.addBubble(new Bubble(800, 480, 2 , 1));
		this.addBubble(new Bubble(100, 128, 2, 1));
		this.addBubble(new Bubble(1120, 200, 2, 1));
	}
}
