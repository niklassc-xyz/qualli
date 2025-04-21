import Level from "./Level.js";
import KI0 from "../../appEtc/KI0.js";
import Bubble from "../../objects/Bubble.js";
import BubbleTemp from "../../objects/BubbleTemp.js";


export default class LevelTest extends Level {
	constructor(g, returnRoom = undefined) {
		super(g, returnRoom);

		this.addObject(new KI0(this.g, 1));

		this.addBase(new BubbleTemp(this.g, 640, 360, 1, 3, 100));

		this.addBase(new Bubble(this.g, 1200, 600, 2, 1, 100));
	}
}
