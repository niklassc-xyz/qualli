import LevelRoom from "./LevelRoom.js";
import Bubble from "../objects/Bubble.js";
import ModDefend from "../appEtc/aiModules/ModDefend.js";
import KI0 from "../appEtc/KI0.js";
import KI3 from "../appEtc/KI3.js";
import ProtectBase from "../objects/bases/ProtectBase.js";

export default class room42 extends LevelRoom {
	constructor(g, returnRoom = undefined) {
		super(g);


		let ai0 = this.addObject(new KI3(this.g, 2));
		let mod0 = new ModDefend(g);
		ai0.modules.push(mod0);

		this.addObject(new KI0(this.g, 3));



		let s0 = this.addBubble(new Bubble(this.g, 150, 150, 1, 1, 150));

		let s1 = this.addBubble(new Bubble(this.g, 500, 650, 2, 1, 10));
		this.addBubble(new Bubble(this.g, 1000, 500, 2, 10, 3000));

		this.addBubble(new Bubble(this.g, 500, 300, 3, 1, 220));

		// this.addBubble(new UnlockBase(this.g, 1000, 150, 100));
		// this.addBubble(new UnlockBase(this.g, 100, 600, 100));

		this.addBubble(new ProtectBase(this.g, 200, 450, 32, 32, [s0, s1]));
	}
}
