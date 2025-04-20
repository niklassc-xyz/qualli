import Room from "./../parapluie/Room.js";
import SimBubbleEmitter from "../objects/SimBubble/SimBubbleEmitter.js";
import Button from "../parapluie/objects/util/Button.js";
import LevelButton from "../objects/LevelButton.js";
import Level17 from "./Level17.js";
import Level18 from "./Level18.js";
import Level19 from "./Level19.js";
import Level26 from "./Level26.js";
import MenuOverview from "./MenuOverview.js";

export default class RoomMenuArchive extends Room {
	constructor(g, returnRoom = undefined) {
		super(g, returnRoom);

		this.addObject(new SimBubbleEmitter(this.g, [210, 170, 100]));

		this.addObject(new Button(this.g, "←", 42, g.roomHeight - 128, 90, 90, () => { g.gotoRoom(MenuOverview); } )).setFontSize(24) ;

		let buttonWidth = 128;
		let buttonHeight = 128;
		let buttonMargin = 16;

		let levels = [
			Level17,
			Level18,
			Level19,
			Level26,
		];

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
					levels[i*itemsInRow + j]
				)).setFontSize(36);
			}

	}

	draw() {
		super.draw();

		this.g.painter.ctx.lineWidth = 4;
		this.g.painter.ctx.font = "42px fnt_Comforta_Light";
		this.g.painter.ctx.fillStyle = "white"
		this.g.painter.ctx.textAlign = "center";
		this.g.painter.ctx.fillText("Archive 📦", this.g.roomWidth/2, 32);
	}
}
