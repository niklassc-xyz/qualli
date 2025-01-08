import IObjlistentry from "./IObjlistentry.js";
import * as g from "../globals.js";
import * as f from "../functions.js";
import Colors from "./color/Colors.js";
import Jelly from "../objects/Jelly.js";
import ProgressManager from "./ProgressManager.js";

export default class KI extends IObjlistentry {
	constructor(team) {
		super();
		this.team = team;
		this.alarm = [];
		this.alarm[0] = 20;

		this.modules = [];
	}

	step() {
		// Timers
		for(let i = 0; i < this.alarm.length; i++) {
			if(this.alarm[i] > 0) {
				this.alarm[i]--;
				if(this.alarm[i] === 0) this.alarmieren(i);
			}
		}

		// Modules
		for (let i = 0; i < this.modules.length; i++) {
			this.modules[i].modStep(this);
		}
	}

	// TODO Room should draw symbols
	draw() {
		g.ctx.fillStyle = Colors.team[this.team].cRgba();
		g.ctx.strokeStyle = "rgba(50, 50, 50, 0.6)";
		let linew = 2;
		g.ctx.lineWidth = linew * g.xScalar;
		let symbolx = (32 + (this.team - 2) * 48);
		let symboly = 32;
		let r = 16;
		let symbolxD = (32 + (this.team - 2) * 48) * g.xScalar;
		let symbolyD = 32 * g.xScalar;
		let rD = 16 * g.xScalar;
		f.draw_circle(symbolxD, symbolyD, rD, false);
		f.draw_circle(symbolxD, symbolyD, rD, true);

		g.ctx.fillStyle = "rgba(50, 50, 50, 0.9)";
		g.ctx.fillText(this.constructor.name, symbolxD, symbolyD);

		// Modules
		for (let i = 0; i < this.modules.length; i++) {
			let mr = 8;
			let mx = symbolx;
			let my = symboly + r + mr + 2*linew;
			let mod = this.modules[i];

			mod.drawIcon(mx, my, mr);
		}

	}

	pruefe_ob_eigene_Raumschiffe_im_Spiel() {
		for(var i = 0; i < g.room.objects.length; i++) {
			if(g.room.objects[i] instanceof Jelly) {
				if(g.room.objects[i].team === this.team) return true;
			}
		}
		return false;
	}

	getBubbles() {
		var bubbles = [];
		for(var i = 0; i < g.room.bubbles.length; i++) {
			if(g.room.bubbles[i].team === this.team) {
				bubbles[bubbles.length] = g.room.bubbles[i];
			}
		}
		return bubbles;
	}

	// Returns a random own bubble that is not `excludeBubble`
	getRandomBubbleOtherThan(excludeBubble) {
		let bubbles = this.getBubbles();

		if (bubbles.length < 2) {
			return undefined;
		}

		while (true) {
			let ri = Math.floor(Math.random() * bubbles.length);
			let randomBubble = bubbles[ri];

			if (randomBubble !== excludeBubble) {
				return randomBubble;
			}
		}

	}

	getStrongestPlanet() {
		var bubbles = this.getBubbles();
		if(bubbles.length === 0) return;
		var strongest_index = 0;
			// Suche stärksten Planeten aus eigener bubbles aus.
			for(var i = 0; i < bubbles.length; i++) {
				if(bubbles[i].units > bubbles[strongest_index].units) {
					strongest_index = i;
				}
			}
		return bubbles[strongest_index];
	}

	getEnemyBubblesWeakerThan(n) {
		var enemyList = [];
		for(var i = 0; i < g.room.bubbles.length; i++) {
			if(g.room.bubbles[i].team !== this.team && n > g.room.bubbles[i].units) {
				enemyList[enemyList.length] = g.room.bubbles[i];
			}
		}
		return enemyList;
	}

	// TODO rename
	angriff(planet_start, planet_ziel){
		for(var i = 0; i < Math.floor(planet_start.units / 2); i++) {
			let nx = planet_start.x;
			let ny = planet_start.y;

			planet_start.createQueue.addLast([nx, ny, this.team, planet_ziel]);

		}
		planet_start.units -= Math.floor(planet_start.units/2)
	}

	// TODO do this in room
	pruefe_ob_gewonnen() {
		for(var i = 0; i < g.room.objects.length; i++) {
			if(g.room.objects[i] instanceof KI) {
				return false;
			}
		}
		return true;
	}

	deleteIfDefeatedAndCheckIfWon() {
		// Wenn kein Planet und keine Raumschiffe mehr vorhanden sind, KI löschen, dann prüfen ob Spieler gewonnen.
		if(this.getBubbles().length === 0) {
			/* Wenn kein Planet mehr da ist, aber noch Raumschiffe soll weder
			* die KI gelöscht werden, noch der restliche Angriffsplan
			* ausgeführt werden.
			*/
			if(this.pruefe_ob_eigene_Raumschiffe_im_Spiel()) {
				this.alarm[0] = 200 + Math.round(Math.random() * 100);
				return;
			}

			// Delete AI if it owns neither bubbles nor jellies
			this.destroy(); // TODO remove from room.ais

			// Prüfen, ob noch eine KI da ist, sonst gewonnen.
			if(g.room.status == "running" && this.pruefe_ob_gewonnen()){
				f.showEndgame(true)
				g.room.status = "won";

				// TODO win/lose logic should be in LevelRoom
				ProgressManager.updateLevelStats(g.room.constructor.name, true);
			}
			return true;
		}

		return false;
	}
}
