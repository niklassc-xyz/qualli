import Settings from "./datafiles/javascript/Settings.js";
import ProgressManager from "./datafiles/javascript/appEtc/ProgressManager.js";
import Game from "./datafiles/javascript/parapluie/Game.js";
import PausedOverlay from "./datafiles/javascript/overlays/PausedOverlay.js";
import EndgameOverlay from "./datafiles/javascript/overlays/EndgameOverlay.js";
import RatioOverlay from "./datafiles/javascript/overlays/RatioOverlay.js";
import PwaOverlay from "./datafiles/javascript/overlays/PwaOverlay.js";
import Startpage from "./datafiles/javascript/rooms/Startpage.js";

class Qualli extends Game {
	constructor(initalRoom, fps=60) {
		super(initalRoom, fps);

		this.progressManager = new ProgressManager(this.storage);
		this.settings = new Settings(this);
		this._pausedOverlay = new PausedOverlay();
		this._endgameOverlay;

		this.start();
	}

	// TODO Move to level ROOM → Game.pause should simply pause the game loop
	pause() {
		this._pausedOverlay.add();
		super.pause();
	}

	unpause() {
		this._pausedOverlay.remove();
		super.unpause();
	}

	showEndgame(won) {
		let levelTime = (this.stepCount / 60).toFixed(1);

		this._endgameOverlay = new EndgameOverlay(won, levelTime);
		this._endgameOverlay.add();
	}

	hideEndgame() {
		this._endgameOverlay.remove();
		this._endgameOverlay = undefined;
	}

	resize() {
		super.resize();
		// const maxRatio = 2.1;
		// const ratio = this.painter.viewWidth / this.painter.viewHeight;
		// if (ratio > maxRatio) {

		const ratioCurrent = this.painter.viewWidth / this.painter.viewHeight;
		const ratioReverse = this.painter.viewHeight / this.painter.viewWidth;

		if (typeof this._ratioOverlay === "undefined")
			this._ratioOverlay = new RatioOverlay();

		if (ratioCurrent < ratioReverse) {
			this._ratioOverlay.add();
		} else {
			this._ratioOverlay.remove();
		}
	}
}


// TODO remove → move overlays out of index.html
window.ProgressManager = ProgressManager;

window.addEventListener('beforeinstallprompt', (e) => {
	// TODO do in game
	const pwaOverlay = new PwaOverlay(e);
	pwaOverlay.add();
});

window.onload = () => {
	var game = new Qualli(Startpage);
	window.g = game;
}
