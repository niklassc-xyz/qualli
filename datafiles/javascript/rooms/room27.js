import LevelRoom from "./LevelRoom.js";
import Bubble from "../objects/Bubble.js";
import KI0 from "../appEtc/KI0.js";
import KI1 from "../appEtc/KI1.js";

export default class room27 extends LevelRoom {
	constructor(g, returnRoom = undefined) {
		super(g, returnRoom);

		this.addObject(new KI0(this.g, 2));
		this.addObject(new KI1(this.g, 3));
		this.addObject(new KI1(this.g, 3));

		let planetDistance = 200; // centre to centre
		let itemsInRow = 6;


		let marginVert = 30;
		let marginHorz = 30;

		this.addBase(new Bubble(this.g, marginVert + 0 * planetDistance, 160 + 0 * planetDistance, 1, 1, 5000));
		this.addBase(new Bubble(this.g, marginVert + 4 * planetDistance, 160 + 1 * planetDistance, 2, 10, 5000));
	}
}
