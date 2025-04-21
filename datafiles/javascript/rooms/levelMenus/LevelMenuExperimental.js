import LevelMenu from "./LevelMenu.js";
import Level24 from "../levels/Level24.js";
import Level25 from "../levels/Level25.js";
import Level27 from "../levels/Level27.js";
import Level28 from "../levels/Level28.js";
import Level29 from "../levels/Level29.js";
import Level30 from "../levels/Level30.js";
import Level31 from "../levels/Level31.js";
import Level32 from "../levels/Level32.js";
import Level33 from "../levels/Level33.js";
import Level34 from "../levels/Level34.js";
import Level35 from "../levels/Level35.js";
import Level36 from "../levels/Level36.js";
import Level37 from "../levels/Level37.js";
import Level38 from "../levels/Level38.js";
import Level39 from "../levels/Level39.js";
import Level40 from "../levels/Level40.js";
import Level41 from "../levels/Level41.js";
import Level42 from "../levels/Level42.js";
import LevelTest from "../levels/LevelTest.js";

export default class LevelMenuExperimental extends LevelMenu {
	constructor(g, returnRoom=undefined) {
		const title = "Experimental ⚛";
		const levels = [
			LevelTest,
			Level24,
			Level25,
			Level27,
			Level28,
			Level29,
			Level30,
			Level31,
			Level32,
			Level33,
			Level34,
			Level35,
			Level36,
			Level37,
			Level38,
			Level39,
			Level40,
			Level41,
			Level42,
		];
		const simBubbleBaseColor = [255, 120, 210];

		super(g, title, levels, simBubbleBaseColor, returnRoom);
	}
}
