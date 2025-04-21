import LevelMenu from "./LevelMenu.js";
import Level17 from "../levels/Level17.js";
import Level18 from "../levels/Level18.js";
import Level19 from "../levels/Level19.js";
import Level26 from "../levels/Level26.js";

export default class LevelMenuAdvanced extends LevelMenu {
	constructor(g, returnRoom=undefined) {
		const title = "Archive 📦";
		const levels = [
			Level17,
			Level18,
			Level19,
			Level26,
		];
		const simBubbleBaseColor = [210, 170, 100];

		super(g, title, levels, simBubbleBaseColor, returnRoom);
	}
}
