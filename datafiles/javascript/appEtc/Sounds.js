import Settings from "../parapluie/Settings.js";

// TODO move to engine?
export default class Sounds {

	// TODO change to static initilization
	// static sounds["bing"] = new Audio("datafiles/sounds/bing4.ogg");
	static sound = new Audio("datafiles/sounds/bing4.ogg");

	static play(soundName) {
		if (Settings.mute)
			return;

		let sound = this.sound;
		if (typeof sound === "undefined")
			return;

		sound.play();
	}
}
