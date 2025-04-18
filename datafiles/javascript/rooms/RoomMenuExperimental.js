import Room from "./../parapluie/Room.js";
import SimBubbleEmitter from "../objects/SimBubble/SimBubbleEmitter.js";
import Button from "../parapluie/objects/util/Button.js";
import LevelButton from "../objects/LevelButton.js";
import MenuOverview from "./MenuOverview.js";
import level24 from "./level24.js";
import level25 from "./level25.js";
import level27 from "./level27.js";
import level28 from "./level28.js";
import level29 from "./level29.js";
import level30 from "./level30.js";
import level31 from "./level31.js";
import level32 from "./level32.js";
import level33 from "./level33.js";
import level34 from "./level34.js";
import level35 from "./level35.js";
import level36 from "./level36.js";
import level37 from "./level37.js";
import level38 from "./level38.js";
import level39 from "./level39.js";
import level40 from "./level40.js";
import level41 from "./level41.js";
import level42 from "./level42.js";
import levelTest from "./levelTest.js";

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
			levelTest,
			level24,
			level25,
			level27,
			level28,
			level29,
			level30,
			level31,
			level32,
			level33,
			level34,
			level35,
			level36,
			level37,
			level38,
			level39,
			level40,
			level41,
			level42,
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
