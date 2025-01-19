import Room from "./Room.js";
import SimBubbleEmitter from "../objects/SimBubble/SimBubbleEmitter.js";
import Button from "../objects/Button.js";
import LevelButton from "../objects/LevelButton.js";
import room17 from "./room17.js";
import room18 from "./room18.js";
import room19 from "./room19.js";
import room26 from "./room26.js";
import MenuOverview from "./MenuOverview.js";

export default class RoomMenuArchive extends Room {
	constructor(g) {
		super(g);

		this.addObject(new SimBubbleEmitter(this.g, [210, 170, 100]));

		this.n_step = 0; // TODO replace with stepCount

		this.addObject(new Button(this.g, "←", 42, g.roomHeight - 128, 90, 90, () => { g.gotoRoom(MenuOverview); } )).setFontSize(24) ;

		let buttonWidth = 128;
		let buttonHeight = 128;
		let buttonMargin = 16;

		let rooms = [
			room17,
			room18,
			room19,
			room26,
		];

		let itemsInRow = 4;
		let itemsinColumn = Math.ceil(rooms.length / itemsInRow)



		// Calculate start margin in order to center the items block
		let rowWidth = ((itemsInRow-1) * buttonMargin + itemsInRow * buttonWidth);
		let marginLeft = (g.roomWidth - rowWidth) / 2;

		let columnHeight = ((itemsinColumn-1) * buttonMargin + itemsinColumn * buttonHeight);
		let marginTop = (g.roomHeight - columnHeight) / 2;

		for(let i = 0; i < itemsinColumn; i++)
			for(let j = 0; j < itemsInRow && i*itemsInRow + j < rooms.length; j++) {
				this.addObject(new LevelButton(
					this.g,
					i*itemsInRow + j,
					marginLeft + j * (buttonWidth + buttonMargin),
					marginTop + i * (buttonHeight + buttonMargin),
					buttonWidth,
					buttonHeight,
					rooms[i*itemsInRow + j]
				)).setFontSize(36);
			}

	}

	draw() {
		super.draw();

		g.ctx.lineWidth = 4;
		g.ctx.font = "42px fnt_Comforta_Light";
		g.ctx.fillStyle = "white"
		g.ctx.textAlign = "center";
		g.ctx.fillText("Archive 📦", g.roomWidth/2, 32);
	}
}
