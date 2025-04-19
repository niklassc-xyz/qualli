import Room from "./../parapluie/Room.js";
import SimBubbleEmitter from "../objects/SimBubble/SimBubbleEmitter.js";
import Button from "../parapluie/objects/util/Button.js";
import LevelButton from "../objects/LevelButton.js";
import MenuOverview from "./MenuOverview.js";
import Level24 from "./Level24.js";
import Level25 from "./Level25.js";
import Level27 from "./Level27.js";
import Level28 from "./Level28.js";
import Level29 from "./Level29.js";
import Level30 from "./Level30.js";
import Level31 from "./Level31.js";
import Level32 from "./Level32.js";
import Level33 from "./Level33.js";
import Level34 from "./Level34.js";
import Level35 from "./Level35.js";
import Level36 from "./Level36.js";
import Level37 from "./Level37.js";
import Level38 from "./Level38.js";
import Level39 from "./Level39.js";
import Level40 from "./Level40.js";
import Level41 from "./Level41.js";
import Level42 from "./Level42.js";
import LevelTest from "./LevelTest.js";

export default class RoomMenuExperimental extends Room {
	constructor(g, returnRoom = undefined) {
		super(g, returnRoom);

		this.addObject(new SimBubbleEmitter(this.g, [255, 120, 210]));

		this.n_step = 0; // TODO replace with stepCount

		this.addObject(new Button(this.g, "←", 42, g.roomHeight - 128, 90, 90, () => { g.gotoRoom(MenuOverview); } )).setFontSize(24) ;

		let buttonWidth = 128;
		let buttonHeight = 128;
		let buttonMargin = 16;

		let levels = [
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
		this.g.painter.ctx.fillText("Experimental ⚛", this.g.roomWidth/2, 32);
	}
}
