import Settings from "./datafiles/javascript/Settings.js";
import ProgressManager from "./datafiles/javascript/appEtc/ProgressManager.js";

import startpage from "./datafiles/javascript/rooms/Startpage.js";
import Game from "./datafiles/javascript/parapluie/Game.js";

class Qualli extends Game {
	constructor(initalRoom, fps=60) {
		super(initalRoom, fps);

		this.progressManager = new ProgressManager(this.storage);
		this.settings = new Settings(this);

		this.start();
	}

	pause() {
		document.getElementById("pausedOverlay").classList.remove("hidden");
		super.pause();
	}

	unpause() {
		document.getElementById("pausedOverlay").classList.add("hidden");
		super.unpause();
	}
}


// TODO remove → move overlays out of index.html
window.ProgressManager = ProgressManager;

window.onload = () => {
	var game = new Qualli(startpage);
	window.g = game;
}
