import Level from "./Level.js";
import Actor from "../../Actor/Actor.js";
import Bubble from "../../objects/bases/Bubble.js";
import ModBubble0 from "../../Actor/AiModule/ModBubble0.js";

export default class Level27 extends Level {
	constructor(g, returnRoom = undefined) {
		super(g, returnRoom);

		const ai0 = this.addActor(new Actor(this.g, 2));
		ai0.addModule(new ModBubble0(this.g));

		let planetDistance = 200; // centre to centre
		let itemsInRow = 6;


		let marginVert = 30;
		let marginHorz = 30;

		this.addBase(new Bubble(this.g, marginVert + 0 * planetDistance, 160 + 0 * planetDistance, 1, 1, 5000));
		this.addBase(new Bubble(this.g, marginVert + 4 * planetDistance, 160 + 1 * planetDistance, 2, 10, 5000));
	}
}
