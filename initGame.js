import Settings from "./datafiles/javascript/parapluie/Settings.js";
import ProgressManager from "./datafiles/javascript/appEtc/ProgressManager.js";

import startpage from "./datafiles/javascript/rooms/Startpage.js";
import Game from "./datafiles/javascript/parapluie/Game.js";

class Qualli extends Game {
	constructor(initalRoom, fps=60) {
		super(initalRoom, fps);

		this.progressManager = new ProgressManager(this.storage);
	}
}


// TODO remove → move overlays out of index.html
window.Settings = Settings;
window.ProgressManager = ProgressManager;

window.onload = () => {
	var game = new Qualli(startpage);
	window.game = game;
}
