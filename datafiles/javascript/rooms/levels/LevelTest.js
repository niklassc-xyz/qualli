import Level from "./Level.js";
import KI0 from "../../appEtc/KI0.js";
import ModFleeTemp from "../../appEtc/aiModules/ModFleeTemp.js";
import Bubble from "../../objects/Bubble.js";
import BubbleTemp from "../../objects/BubbleTemp.js";
import Boss from "../../objects/bases/Boss.js";


export default class LevelTest extends Level {
	constructor(g, returnRoom = undefined) {
		super(g, returnRoom);

		let ai0 = this.addObject(new KI0(this.g, 2));
		let modFleeTemp = new ModFleeTemp(g);
		ai0.modules.push(modFleeTemp);

		this.addBase(new BubbleTemp(this.g, 640, 360, 1, 3, 100));
		this.addBase(new BubbleTemp(this.g, 1000, 100, 1, 2, 10));
		this.addBase(new BubbleTemp(this.g, 100, 600, 1, 2, 10));

		this.addBase(new Bubble(this.g, 1200, 600, 2, 1, 100));
		this.addBase(new Boss(this.g, 100, 100, 2));
	}
}
