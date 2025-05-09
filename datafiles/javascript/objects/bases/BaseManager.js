import DimensionEntity from "../../parapluie/objects/DimensionEntity.js";
import Bubble from "./Bubble.js";
import * as collision from "../../parapluie/functions/collision.js";

export default class BaseManager extends DimensionEntity {
	_bases; _selected;

	constructor(g) {
		super(g, -200, -200, 0, 0);

		this.g.input.registerClickable(this);

		// For circle animation
		this.circleCounterMax = 20;
		this.circleCounter = 0;

		/**
		 * List of active bases in the level
		 * @type {Base}
		 */
		this._bases = [];

		this._selected = undefined;
	}

	draw() {
		super.draw();
		this.selectedDrawing();
	}

	destroy() {
		super.destroy();
		this.g.input.unregisterClickable(this);
	}

	getBases() {
		return this._bases;
	}

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

	// Draw circle indicator arround selectedBubble and arrow
	selectedDrawing() {
		if(this._selected !== undefined) {
			// Cancel if selected bubble has been captured in the meantime
			if(this._selected.team !== 1) {
				this._selected = undefined; return;
			}

			// Draw arrow from selected to cursor
			let r = this._selected.width / 2;
			let inputX = this.g.input.getX();
			let inputY = this.g.input.getY();

			if (!collision.pointInCircle(inputX, inputY, this._selected.x, this._selected.y, r)) {
				let dx = inputX - this._selected.x;
				let dy = inputY - this._selected.y;
				let dist = Math.sqrt(dx**2 + dy**2);
				let ndx = dx / dist;
				let ndy = dy / dist;
				let startx = this._selected.x + ndx*r;
				let starty = this._selected.y + ndy*r;
				this.g.painter.ctx.strokeStyle = "white";
				this.g.painter.ctx.lineWidth = 3;
				this.g.painter.strokeLine(startx, starty, inputX, inputY);
			}

			// Highlight selected bubble
			this.g.painter.ctx.lineWidth = 2;
			this.g.painter.ctx.strokeStyle = "white";
			for(let i = 0; i < 5 + Math.abs(this.circleCounter - this.circleCounterMax/2); i+=3) {
				this.g.painter.strokeCircle(
							this._selected.x,
							this._selected.y,
							this._selected.width / 2 + i,
							);
			}

			this.circleCounter = (this.circleCounter + 1) % this.circleCounterMax;
		}

	}
}
