import Settings from "./datafiles/javascript/Settings.js";
import ProgressManager from "./datafiles/javascript/appEtc/ProgressManager.js";
import Game from "./datafiles/javascript/parapluie/Game.js";
import PausedOverlay from "./datafiles/javascript/overlays/PausedOverlay.js";
import Startpage from "./datafiles/javascript/rooms/Startpage.js";

class Qualli extends Game {
	constructor(initalRoom, fps=60) {
		super(initalRoom, fps);

		this.progressManager = new ProgressManager(this.storage);
		this.settings = new Settings(this);
		this._pausedOverlay = new PausedOverlay();

		this.start();
	}

	pause() {
		this.overlayManager.openOverlay(this._pausedOverlay);
		super.pause();
	}

	unpause() {
		this.overlayManager.closeOverlay(this._pausedOverlay);
		super.unpause();
	}

	showEndgame(won) {
		let levelTime = (this.stepCount / 60).toFixed(1);

		document.getElementById("egWon").innerHTML = won ? "won 🥳" : "lost 🤬"
		document.getElementById("egTime").innerHTML = `${levelTime} seconds`
		document.getElementById("endgameOverlay").classList.remove("hidden")
	}

	hideEndgame() {
		document.getElementById("endgameOverlay").classList.add("hidden")
	}
}


// TODO remove → move overlays out of index.html
window.ProgressManager = ProgressManager;

window.onload = () => {
	var game = new Qualli(Startpage);
	window.g = game;
}
