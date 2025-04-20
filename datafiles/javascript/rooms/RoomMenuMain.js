import Room from "./../parapluie/Room.js";
import SimBubbleEmitter from "../objects/SimBubble/SimBubbleEmitter.js";
import Button from "../parapluie/objects/util/Button.js";
import LevelButton from "../objects/LevelButton.js";
import MenuOverview from "./MenuOverview.js";
import Level0 from "./Level0.js";
import Level1 from "./Level1.js";
import Level2 from "./Level2.js";
import Level3 from "./Level3.js";
import Level4 from "./Level4.js";
import Level5 from "./Level5.js";
import Level6 from "./Level6.js";
import Level7 from "./Level7.js";
import Level8 from "./Level8.js";
import Level9 from "./Level9.js";
import Level10 from "./Level10.js";
import Level11 from "./Level11.js";
import Level20 from "./Level20.js";
import Level21 from "./Level21.js";
import Level22 from "./Level22.js";
import Level23 from "./Level23.js";

export default class RoomMenuMain extends Room {
	constructor(g, returnRoom = undefined) {
		super(g, returnRoom);

		this.addObject(new SimBubbleEmitter(this.g, [120, 255, 120]));

		let levels = [Level0,
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
