import Level from "./Level.js";
import Actor from "../../Actor/Actor.js";
import Bubble from "../../objects/bases/Bubble.js";
import ModBubble0 from "../../Actor/AiModule/ModBubble0.js";
import ModDefendBubble from "../../Actor/AiModule/ModDefendBubble.js";
import UnlockBase from "../../objects/bases/UnlockBase.js";
import ProtectBase from "../../objects/bases/ProtectBase.js";


export default class Level41 extends Level {
	constructor(g, returnRoom = undefined) {
		super(g, returnRoom);


		const ai0 = this.addActor(new Actor(this.g, 2));
		ai0.addModule(new ModDefendBubble(this.g));

		const ai1 = this.addActor(new Actor(this.g, 3));
		ai1.addModule(new ModBubble0(this.g));



		let s0 = this.addBase(new Bubble(this.g, 150, 150, 1, 1, 150));

		let s1 = this.addBase(new Bubble(this.g, 500, 650, 2, 1, 10));
		this.addBase(new Bubble(this.g, 1000, 500, 2, 10, 3000));

		this.addBase(new Bubble(this.g, 500, 300, 3, 1, 220));


		this.addBase(new UnlockBase(this.g, 1000, 150, 100));
		this.addBase(new UnlockBase(this.g, 100, 600, 100));

		this.addBase(new ProtectBase(this.g, 200, 450, 32, 32, [s0, s1]));
	}
}
