import DimensionEntity from "../../parapluie/objects/DimensionEntity.js";
import Bubble from "./Bubble.js";
import * as collision from "../../parapluie/functions/collision.js";

export default class BaseManager extends DimensionEntity {
	_bases; _selected;

	constructor(g) {
		super(g, -200, -200, 0, 0);

		/**
		 * List of active bases in the level
		 * @type {Base}
		 */
		this._bases = [];

		this._selected = undefined;
	}

	onAdd() {
		this._registerClickable();
	}

	step() {
		super.step();

		// Clear selected base, if it has been captured
		if (typeof this._selected !== "undefined" && this._selected.team !== 1)
			this._selected = undefined;

		if (this._selected !== undefined)
			this._selected.stepSelected();
	}

	draw() {
		super.draw();

		if(this._selected !== undefined)
			this._selected.drawSelected();
	}

	destroy() {
		super.destroy();
	}

	// Gets bases that are instance of a class in `classes`. If classes undefined
	// returns all bases
	getBases(classes=undefined) {
		if (typeof classes === "undefined")
			return this._bases;


		let bases = [];
		for (let i = 0; i < this._bases.length; i++) {
			for (const cls of classes) {
				if (this._bases[i] instanceof cls) {
					bases.push(this._bases[i]);
					break;
				}
			}
		}
		return bases;
	}

	getBasesByClass() {

	}

	// TODO replace by more general getBases
	getBubbles() {
		let bubbles = [];
		for (let i = 0; i < this._bases.length; i++) {
			if (this._bases[i] instanceof Bubble)
				bubbles.push(this._bases[i]);
		}
		return bubbles;
	}

	getBubblesByTeam(team) {
		let bubbles = [];
		for(let i = 0; i < this._bases.length; i++) {
			if(this._bases[i] instanceof Bubble && this._bases[i].team === team) {
				bubbles[bubbles.length] = this._bases[i];
			}
		}
		return bubbles;
	}

	// Returns first base which collides with (x|y), undefined if no base at this point
	getBaseByLocation(x, y) {
		for (let i = 0; i < this._bases.length; i++) {
			let iBase = this._bases[i];
		
			// TODO use pointInCircle or entity specific collision method (→ collision methods in entities based on shape, add hitbox)
			if (collision.pointInRectangle(x,
			                               y,
			                               iBase.x - iBase.ox,
			                               iBase.y - iBase.oy,
			                               iBase.x - iBase.ox + iBase.width,
			                               iBase.y - iBase.oy + iBase.height)) {
				return iBase;
			}
		}

		return undefined;
	}

	getBasesByTeam(team) {
		let bases = [];
		for(let i = 0; i < this._bases.length; i++) {
			if(this._bases[i].team === team) {
				bases[bases.length] = this._bases[i];
			}
		}
		return bases;
	}


	// Gets called by bases to notify that a clickUp happened on them
	notifyClickUp(base) {
		if (typeof this._selected !== "undefined") {
			if (base === this._selected) {
				this._selected = base;
			} else {
				this._selected.action(base);
				this._selected = undefined;
			}

		}
	}

	// Gets called by bases to notify that a clickDown happened on them
	notifyClickDown(base) {
		if (typeof this._selected === "undefined") {
			// Start drag method
			this._selected = base;
		}
	}

	clickMiss() {
		this._selected = undefined;
	}

	// Adds base to be managed by BaseManager (Adds it to game and makes it
	// available for selection by player and AIs)
	registerBase(base) {
		this._bases.push(base);

		return base;
	}

	unregisterBase(base) {
		// TODO datastructure
		for (var i = 0; i < this._bases.length; i++) {
			if (this._bases[i] === base) {
				this._bases.splice(i, 1);
				return true;
			}
		}

		console.error("Attempted to deleted base that is not in BaseManager.bases", base);
		return false;
	}

	// Checks if selected bases are still owned, otherwise clears
	ensureOwner() {
		if (this._selected !== undefined && this._selected.team !== 1) {
			this._selected = undefined;
		}
	}
}
