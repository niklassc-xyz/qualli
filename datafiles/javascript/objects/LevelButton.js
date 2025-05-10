import Button from "../parapluie/objects/util/Button.js";

export default class LevelButton extends Button {
	constructor(g, text, x, y, width, height, level, locked=false) {
		let onClick = () => {
			if (this.locked && false) {
				alert("Unlock this level first");
				return false;
			}
			g.gotoRoom(level, g.room.constructor)
		};
		super(g, text, x, y, width, height, onClick, false);

		this.level = level;
		this.locked = locked;
		this.spriteLock = this.g.resourceManager.getSpriteByPath("datafiles/sprites/lock.png");

		this.won = g.progressManager.getLevelStats(level.name).won;


		if (this.won > 3) {
			this.medal = this.g.resourceManager.getSpriteByPath("datafiles/sprites/medals/gold.png");
		} else if (this.won > 1) {
			this.medal = this.g.resourceManager.getSpriteByPath("datafiles/sprites/medals/silver.png");
		} else if (this.won > 0) {
			this.medal = this.g.resourceManager.getSpriteByPath("datafiles/sprites/medals/bronze.png");
		} else {
			this.medal = undefined;
		}

		// TODO calculate font size → in base class
	}

	draw() {
		super.draw();

		const mWidth = 21; // Medal width → keep aspect ratio of sprite
		const mHeight = 32; // Medal height → keep aspect ratio of sprite
		const mMargin = 6;
		if (this.medal != undefined) {
			// TODO move drawImage to painter
			this.g.painter.ctx.drawImage(this.medal,
				this.x + this.width - mWidth - mMargin,
				this.y + mMargin,
				mWidth,
				mHeight);
		}

		if (this.locked) {
			const lMargin = mMargin;
			const lHeight = mHeight;
			const lWidth = lHeight;
			this.g.painter.ctx.drawImage(this.spriteLock,
				this.x + this.width - lWidth - lMargin,
				this.y + lMargin,
				lWidth,
				lHeight);
		}
	}
}
