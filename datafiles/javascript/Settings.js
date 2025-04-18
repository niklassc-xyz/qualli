export default class Settings {
	constructor(g) {
		this.g = g;
		this.storage = g.storage;

		// Initialize settings if not in storage yet
		// SET DEFAULT VALUES HERE
		this.g.storage.setIfNotSet("settingsDebug", false);
		this.g.storage.setIfNotSet("settingsExperimental", true);
		this.g.storage.setIfNotSet("settingsScaling", true);
		this.g.storage.setIfNotSet("settingsMute", true);
		this.g.storage.setIfNotSet("settingsJellyGlow", true);

		document.getElementById("sDebug").checked = this.getDebug();
		document.getElementById("sExperimental").checked = this.getExperimental();
		document.getElementById("sScaling").checked = this.getScaling();
		document.getElementById("sMute").checked = this.getMute();
		document.getElementById("sJellyGlow").checked = this.getJellyGlow();

		// Values that are stored in the Game need to be set after each
		// initialization of the Game
		this.g.setDebug(this.getDebug());
		this.g.setScaling(this.getDebug());
		this.g.resourceManager.setMute(this.getMute());
	}

	// Show overlay
	show() {
		document.getElementById("settingsOverlay").classList.remove("hidden");
	}

	// Hide overlay
	hide() {
		document.getElementById("settingsOverlay").classList.add("hidden");
	}

	getDebug() {
		return this.storage.get("settingsDebug") == "true";
	}

	setDebug(val) {
		document.getElementById("sDebug").checked = val;
		this.g.setDebug(val);
		this.storage.set("settingsDebug", val);
	}

	toggleDebug() {
		const val = !this.getDebug();
		this.setDebug(val);
		return val;
	}

	getExperimental() {
		return this.storage.get("settingsExperimental") == "true";
	}

	setExperimental(val) {
		document.getElementById("sExperimental").checked = val;
		this.storage.set("settingsExperimental", val);
	}

	toggleExperimental() {
		const val = !this.getExperimental();
		this.setExperimental(val);
		return val;
	}

	getScaling() {
		return this.storage.get("settingsScaling") == "true";
	}

	setScaling(val) {
		document.getElementById("sScaling").checked = val;
		this.g.setScaling(val);
		this.storage.set("settingsScaling", val);
	}

	toggleScaling() {
		const val = !this.getScaling();
		this.setScaling(val);
		// f.resizeCanvas();
		return val;
	}

	getJellyGlow() {
		return this.storage.get("settingsJellyGlow") == "true";
	}

	setJellyGlow(val) {
		document.getElementById("sJellyGlow").checked = val;
		this.storage.set("settingsJellyGlow", val);
	}

	toggleJellyGlow() {
		const val = !this.getJellyGlow();
		this.setJellyGlow(val);
		return val;
	}

	getMute() {
		return this.storage.get("settingsMute") == "true";
	}

	setMute(val) {
		document.getElementById("sMute").checked = val;
		this.storage.set("settingsMute", val);
		this.g.resourceManager.setMute(val);
	}

	toggleMute() {
		const val = !this.getMute();
		this.setMute(val);
		return val;
	}
}
