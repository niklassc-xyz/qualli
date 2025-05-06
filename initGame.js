import Settings from "./datafiles/javascript/Settings.js";
import ProgressManager from "./datafiles/javascript/appEtc/ProgressManager.js";
import Game from "./datafiles/javascript/parapluie/Game.js";
import PausedOverlay from "./datafiles/javascript/overlays/PausedOverlay.js";
import EndgameOverlay from "./datafiles/javascript/overlays/EndgameOverlay.js";
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
}


// TODO remove → move overlays out of index.html
window.ProgressManager = ProgressManager;

window.onload = () => {
	var game = new Qualli(Startpage);
	window.g = game;
}
