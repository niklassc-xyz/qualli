import GameEntity from "../parapluie/objects/GameEntity.js";
import Colors from "./color/Colors.js";
import Jelly from "../objects/Jelly.js";

export default class KI extends GameEntity {
	constructor(g, team) {
		super(g);
		this.team = team;
		this.alarm = [];
		this.alarm[0] = 20;

		// TODO is this necessary → does room reference suffice
		// this.g = g;

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
		// console.log(this.team);
		this.g.painter.ctx.fillStyle = Colors.team[this.team].cRgba();
		this.g.painter.ctx.strokeStyle = "rgba(50, 50, 50, 0.6)";
		let linew = 2;
		this.g.painter.ctx.lineWidth = linew;
		let symbolx = (32 + (this.team - 2) * 48);
		let symboly = 32;
		let r = 16;
		this.g.painter.fillCircle(symbolx, symboly, r);
		this.g.painter.strokeCircle(symbolx, symboly, r);

		this.g.painter.ctx.fillStyle = "rgba(50, 50, 50, 0.9)";
		this.g.painter.ctx.fillText(this.constructor.name, symbolx, symboly);

		// Modules
		for (let i = 0; i < this.modules.length; i++) {
			let mr = 8;
			let mx = symbolx;
			let my = symboly + r + mr + 2*linew;
			let mod = this.modules[i];

			mod.drawIcon(mx, my, mr);
		}

	}

	// TODO rename
	pruefe_ob_eigene_Raumschiffe_im_Spiel() {
		for(var i = 0; i < this.g.room.entities.length; i++) {
			if(this.g.room.entities[i] instanceof Jelly) {
				if(this.g.room.entities[i].team === this.team) return true;
			}
		}
		return false;
	}

	/**
	 * Returns own bases
	 *
	 * @returns {Array.<Base>} Array of own bases
	 */
	getOwnBases() {
		return this.g.room.baseManager.getBasesByTeam(this.team);
	}

	getForeignBases() {
		let allBases = this.g.room.baseManager.getBases();
		let bases = [];
		for (let i = 0; i < allBases.length; i++) {
			if (allBases[i].team !== this.team) {
				bases.push(allBases[i]);
			}
		}

		return bases;
	}

	// Returns a random own base that is not `excludeBase`
	getRandomBaseOtherThan(excludeBase) {
		let bases = this.getOwnBases();

		if (bases.length < 2) {
			return undefined;
		}

		while (true) {
			let ri = Math.floor(Math.random() * bases.length);
			let randomBase = bases[ri];

			if (randomBase !== excludeBase) {
				return randomBase;
			}
		}
	}

	getOwnStrongestBase() {
		var bases = this.getOwnBases();
		if(bases.length === 0) return;
		var strongest_index = 0;
			// Suche stärksten Planeten aus eigener bases aus.
			for(var i = 0; i < bases.length; i++) {
				if(bases[i].units > bases[strongest_index].units) {
					strongest_index = i;
				}
			}
		return bases[strongest_index];
	}

	getEnemyBasesWeakerThan(n) {
		var enemyList = [];
		const bases = this.g.room.baseManager.getBases();
		for(var i = 0; i < bases.length; i++) {
			if(bases[i].team !== this.team && n > bases[i].units) {
				enemyList[enemyList.length] = bases[i];
			}
		}
		return enemyList;
	}


	// TODO rename
	angriffN(baseStart, baseTarget, n) {
		// TODO move to bubble class
		for(var i = 0; i < n; i++) {
			let nx = baseStart.x;
			let ny = baseStart.y;

			baseStart.createQueue.addLast([nx, ny, this.team, baseTarget]);

		}
		baseStart.units -= n;
	}

	// TODO rename
	angriff(planet_start, planet_ziel) {
		this.angriffN(planet_start, planet_ziel, Math.floor(planet_start.units / 2));
	}

	// TODO do this in room
	// TODO rename
	pruefe_ob_gewonnen() {
		for(var i = 0; i < this.g.room.entities.length; i++) {
			if(this.g.room.entities[i] instanceof KI) {
				return false;
			}
		}
		return true;
	}

	deleteIfDefeatedAndCheckIfWon() {
		// Wenn kein Planet und keine Raumschiffe mehr vorhanden sind, KI löschen, dann prüfen ob Spieler gewonnen.
		if(this.getOwnBases().length === 0) {
			/* Wenn kein Planet mehr da ist, aber noch Raumschiffe soll weder
			* die KI gelöscht werden, noch der restliche Angriffsplan
			* ausgeführt werden.
			*/
			if(this.pruefe_ob_eigene_Raumschiffe_im_Spiel()) {
				this.alarm[0] = 200 + Math.round(Math.random() * 100);
				return;
			}

			// Delete AI if it owns neither bases nor jellies
			this.destroy(); // TODO remove from room.ais

			// Prüfen, ob noch eine KI da ist, sonst gewonnen.
			if(this.g.room.status == "running" && this.pruefe_ob_gewonnen()) {
				this.g.showEndgame(true)
				this.g.room.status = "won";

				// TODO win/lose logic should be in LevelRoom
				this.g.progressManager.updateLevelStats(this.g.room.constructor.name, true);
			}
			return true;
		}

		return false;
	}
}
