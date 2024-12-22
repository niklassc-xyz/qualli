// This class manages storing statistics about games and which levels are unlocked

class ProgressManager {
	// Resets progress
	static reset() {
		let text = "Do you really want to reset your entire progress?";
		if (!confirm(text)) {
			return;
		}

		var cookies = document.cookie.split(";");
		// TODO
		for (var i = 0; i < cookies.length; i++)
			storage.delete(cookies[i].split("=")[0]);

		alert("Your progress has been reset.");
	}

	static updateLevelStats(levelName, won) {
		let levelStats = storage.get(levelName);

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

		storage.set(levelName, JSON.stringify(levelStats));
	}

	// Stores that `level` has been unlocked
	static unlockLevel(level) {
		
	}

	// @return {boolean} Whether `level` is unlocked
	static isUnlocked(level) {
		
	}

}
