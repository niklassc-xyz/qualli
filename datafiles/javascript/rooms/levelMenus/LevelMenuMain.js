import LevelMenu from "./LevelMenu.js";
import Level0 from "../levels/Level0.js";
import Level1 from "../levels/Level1.js";
import Level2 from "../levels/Level2.js";
import Level3 from "../levels/Level3.js";
import Level4 from "../levels/Level4.js";
import Level5 from "../levels/Level5.js";
import Level6 from "../levels/Level6.js";
import Level7 from "../levels/Level7.js";
import Level8 from "../levels/Level8.js";
import Level9 from "../levels/Level9.js";
import Level10 from "../levels/Level10.js";
import Level11 from "../levels/Level11.js";
import Level20 from "../levels/Level20.js";
import Level21 from "../levels/Level21.js";
import Level22 from "../levels/Level22.js";
import Level23 from "../levels/Level23.js";


export default class LevelMenuMain extends LevelMenu {
	constructor(g, returnRoom=undefined) {
		const title = "Main 🐟";
		const levels = [Level0,
                     Level1,
                     Level2,
                     Level3,
                     Level4,
                     Level5,
                     Level6,
                     Level7,
                     Level8,
                     Level9,
                     Level10,
                     Level11,
                     Level20,
                     Level21,
                     Level22,
                     Level23];
		const simBubbleBaseColor = [120, 255, 120];

		super(g, title, levels, simBubbleBaseColor, returnRoom = undefined);
	}
}
