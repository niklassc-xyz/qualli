import Room from "./../parapluie/Room.js";
import SimBubbleEmitter from "../objects/SimBubble/SimBubbleEmitter.js";
import Button from "../parapluie/objects/util/Button.js";
import LevelButton from "../objects/LevelButton.js";
import MenuOverview from "./MenuOverview.js";
import level0 from "./level0.js";
import level1 from "./level1.js";
import level2 from "./level2.js";
import level3 from "./level3.js";
import level4 from "./level4.js";
import level5 from "./level5.js";
import level6 from "./level6.js";
import level7 from "./level7.js";
import level8 from "./level8.js";
import level9 from "./level9.js";
import level10 from "./level10.js";
import level11 from "./level11.js";
import level20 from "./level20.js";
import level21 from "./level21.js";
import level22 from "./level22.js";
import level23 from "./level23.js";

export default class RoomMenuMain extends Room {
	constructor(g, returnRoom = undefined) {
		super(g, returnRoom);

		this.addObject(new SimBubbleEmitter(this.g, [120, 255, 120]));

		this.n_step = 0;

		let levels = [level0,
                     level1,
                     level2,
                     level3,
                     level4,
                     level5,
                     level6,
                     level7,
                     level8,
                     level9,
                     level10,
                     level11,
                     level20,
                     level21,
                     level22,
                     level23];

		this.addObject(new Button(this.g, "←", 42, g.roomHeight - 128, 90, 90, () => { g.gotoRoom(MenuOverview); } )).setFontSize(24) ;

		let buttonWidth = 128;
		let buttonHeight = 128;
		let buttonMargin = 16;



		//  let itemsInRow = 12;
		let itemsInRow = 4;
		let itemsinColumn = Math.ceil(levels.length / itemsInRow)



		// Calculate start margin in order to center the items block
		let rowWidth = ((itemsInRow-1) * buttonMargin + itemsInRow * buttonWidth);
		let marginLeft = (g.roomWidth - rowWidth) / 2;

		let columnHeight = ((itemsinColumn-1) * buttonMargin + itemsinColumn * buttonHeight);
		let marginTop = (g.roomHeight - columnHeight) / 2;

		for(let i = 0; i < itemsinColumn; i++)
			for(let j = 0; j < itemsInRow && i*itemsInRow + j < levels.length; j++) {
				this.addObject(new LevelButton(
					this.g,
					i*itemsInRow + j,
					marginLeft + j * (buttonWidth + buttonMargin),
					marginTop + i * (buttonHeight + buttonMargin),
					buttonWidth,
					buttonHeight,
					levels[i*itemsInRow + j],
				)).setFontSize(36);
			}

	}

	draw() {
		super.draw()

		this.g.painter.ctx.lineWidth = 4;
		this.g.painter.ctx.font = "42px fnt_Comforta_Light";
		this.g.painter.ctx.fillStyle = "white"
		this.g.painter.ctx.textAlign = "center";
		this.g.painter.ctx.fillText("Main 🐟", this.g.roomWidth/2, 32);
	}
}
