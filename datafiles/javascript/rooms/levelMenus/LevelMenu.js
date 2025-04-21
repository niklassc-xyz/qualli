import Room from "../../parapluie/Room.js";
import SimBubbleEmitter from "../../objects/SimBubble/SimBubbleEmitter.js";
import Button from "../../parapluie/objects/util/Button.js";
import LevelButton from "../../objects/LevelButton.js";

export default class LevelMenu extends Room {
	constructor(g, title, levels, simBubbleBaseColor=undefined, returnRoom=undefined) {
		super(g, returnRoom);
		this.title = title;
		// this.levels = levels;

		this.addObject(new SimBubbleEmitter(this.g, simBubbleBaseColor));
		this.addObject(new Button(this.g, "←", 42, g.roomHeight - 128, 90, 90, () => { this.return(); } )).setFontSize(24);

		let buttonWidth = 128;
		let buttonHeight = 128;
		let buttonMargin = 16;

		// TODO make this configurable?
		let itemsInRow = 4;
		let itemsinColumn = Math.ceil(levels.length / itemsInRow)

		// Calculate start margin in order to center the items block
		let rowWidth = ((itemsInRow-1) * buttonMargin + itemsInRow * buttonWidth);
		let marginLeft = (g.roomWidth - rowWidth) / 2;

		let columnHeight = ((itemsinColumn-1) * buttonMargin + itemsinColumn * buttonHeight);
		let marginTop = (g.roomHeight - columnHeight) / 2;
		let prevWon = -1;

		for (let i = 0; i < itemsinColumn; i++)
			for (let j = 0; j < itemsInRow && i*itemsInRow + j < levels.length; j++) {
				const iLvl = i*itemsInRow + j;
				let locked = true;
				if (iLvl === 0 || prevWon > 0)
					locked = false;

				const newButton = this.addObject(new LevelButton(
					this.g,
					iLvl,
					marginLeft + j * (buttonWidth + buttonMargin),
					marginTop + i * (buttonHeight + buttonMargin),
					buttonWidth,
					buttonHeight,
					levels[iLvl],
					locked,
				));

				newButton.setFontSize(36);
				prevWon = newButton.won;
			}
	}

	draw() {
		super.draw()

		this.g.painter.ctx.lineWidth = 4;
		this.g.painter.ctx.font = "42px fnt_Comforta_Light";
		this.g.painter.ctx.fillStyle = "white"
		this.g.painter.ctx.textAlign = "center";
		this.g.painter.ctx.fillText(this.title, this.g.roomWidth/2, 32);
	}
}
