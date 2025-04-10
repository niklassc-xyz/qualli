import LevelStats from "./LevelStats.js";

// This class manages storing statistics about games and which levels are unlocked

// TODO not static → instantiate with storage backend

export default class ProgressManager {
	constructor(storage) {
		this.storage = storage;
	}

	// Resets progress
	reset() {
		let text = "Do you really want to reset your entire progress?";
		if (!confirm(text)) {
			return;
		}

		// TODO only clear progress (in case other things like settings are stored)
		this.storage.clear();

		alert("Your progress has been reset.");
	}

	updateLevelStats(levelName, won) {
		let levelStats = this.storage.get(levelName);

		if (levelStats == undefined) {
			levelStats = new LevelStats(levelName, 0, 0);
		} else {
			levelStats = JSON.parse(levelStats);
		}

		if (won) {
			levelStats.won++;
		} else {
			levelStats.lost++;
		}

		this.storage.set(levelName, JSON.stringify(levelStats));
	}

	// Returns object of type LevelStats
	getLevelStats(levelName) {
		let levelStats = this.storage.get(levelName);
		
		if (levelStats == undefined) {
			return new LevelStats(levelName, 0, 0);
		} else {
			return JSON.parse(levelStats);
		}
	}

	// Stores that `level` has been unlocked
	unlockLevel(level) {
		
	}

	// @return {boolean} Whether `level` is unlocked
	isUnlocked(level) {
		
	}

}
