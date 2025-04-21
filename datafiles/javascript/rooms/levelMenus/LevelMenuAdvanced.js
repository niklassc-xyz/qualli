import LevelMenu from "./LevelMenu.js";
import Level12 from "../levels/Level12.js";
import Level13 from "../levels/Level13.js";
import Level14 from "../levels/Level14.js";
import Level15 from "../levels/Level15.js";
import Level16 from "../levels/Level16.js";

export default class LevelMenuAdvanced extends LevelMenu {
	constructor(g, returnRoom=undefined) {
		const title = "Advanced 🦈";
		const levels = [Level12, Level13, Level14, Level15, Level16];
		const simBubbleBaseColor = [255, 120, 120];

		super(g, title, levels, simBubbleBaseColor, returnRoom = undefined);
	}
}
