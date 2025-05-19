import AiModule from "./AiModule.js";
import * as math from "../../parapluie/functions/math.js";
import harpoonBaseBroken from "../../objects/bases/HarpoonBaseBroken.js";

// TODO move to room?
// 
// 
export default class ModAutoSend extends AiModule {
	constructor(g, sources, targets) {
		super(g);
		this._sources = sources;
		this._targets = targets;

		this.updateCompletelyCaptured();

		this.minX = Number.MAX_VALUE;
		this.maxX = Number.MIN_VALUE;
		this.minY = Number.MAX_VALUE;
		this.maxY = Number.MIN_VALUE;
		for (let i = 0; i < this._sources.length; i++) {
			const ent = this._sources[i];
			this.minX = Math.min(this.minX, ent.x - ent.ox);
			this.maxX = Math.max(this.maxX, ent.x - ent.ox + ent.width);
			this.minY = Math.min(this.minY, ent.y - ent.oy);
			this.maxY = Math.max(this.maxY, ent.y - ent.oy + ent.height);
		}

		console.log(this.minX, this.minY, this.maxX, this.maxY);
	}

	updateCompletelyCaptured() {
		for (let i = 0; i < this._sources.length; i++) {
			const base = this._sources[i];

			if (base.destroyed) {
				// TODO add newly created harpoon bases
				console.log("remove destroyed harpoonBase");
				this._sources.splice(i, 1);
				i--;
				continue;
			}

			if (this.team !== base.team) {
				this.completelyCaptured = false;
				return;
			}
		}

		this.completelyCaptured = true;
	}

	stepModule() {
		super.stepModule();
		this.updateCompletelyCaptured();

		if (this.completelyCaptured)
			this.sendRandom();
	}

	drawModule() {
		if (this.completelyCaptured)
			this.drawBackgroundSources();
	}

	getTargets() {
		return this.g.room.baseManager.getBases(harpoonBaseBroken);
	}

	sendRandom() {
		this._targets = this.getTargets();
		if (this._targets.length === 0)
			return;

		const source = math.chooseRandom(this._sources);
		const target = math.chooseRandom(this._targets);
		const n = Math.min(1, source.units);

		source.sendUnits(target, n);
	}

	// Highlights background of sources
	drawBackgroundSources() {
		const padding = 16;
		// TODO when captured
		this.g.painter.setFillStyle("#a0c5");
		// this.g.painter.setStrokeStyle("#a0c");

		const x = this.minX - padding;
		const y = this.minY - padding;
		const width = this.maxX - this.minX + 2*padding;
		const height = this.maxY - this.minY + 2*padding;
		this.g.painter.fillRoundrect(x, y, width, height, padding);

	}

	drawIcon(x, y, r=8) {
		super.drawIcon(x, y, r);

		this.g.painter.setStrokeStyle("rgba(50, 50, 50, 0.6)");
		this.g.painter.ctx.fillStyle = "#a0c";
		this.g.painter.drawCircle(x, y, r);
	}
}
