import DimensionEntity from "../../parapluie/objects/DimensionEntity.js";
import * as collision from "../../parapluie/functions/collision.js";

export default class BaseManager extends DimensionEntity {
	#bases; #selected;

	constructor(g) {
		super(g, 0, 0, g.roomWidth, g.roomHeight);

		this.g.input.registerClickable(this, this.clickDown.bind(this), this.clickUp.bind(this) );

		// For circle animation
		this.circleCounterMax = 20;
		this.circleCounter = 0;

		/**
		 * List of active bases in the level
		 * @type {Base}
		 */
		this.#bases = [];

		this.#selected = undefined;
	}

	draw() {
		super.draw();
		this.selectedDrawing();
	}

	getBases() {
		return this.#bases;
	}

	// Returns first base which collides with (x|y), undefined if no base at this point
	getBaseByLocation(x, y) {
		for (let i = 0; i < this.#bases.length; i++) {
			let iBase = this.#bases[i];
		
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
		for(let i = 0; i < this.#bases.length; i++) {
			if(this.#bases[i].team === team) {
				bases[bases.length] = this.#bases[i];
			}
		}
		return bases;
	}

	clickUp() {
		let hoveredBase = this.getBaseByLocation(this.g.input.getX(), this.g.input.getY());
		if (typeof hoveredBase !== "undefined") {
			if (typeof this.#selected !== "undefined") {
				if (hoveredBase === this.#selected) {
					this.#selected = hoveredBase;
				} else {
					this.#selected.attack(hoveredBase);
					this.#selected = undefined;
				}

			}
		} else {
			this.#selected = undefined;
		}
	}

	clickDown() {
		// base selection
		if (typeof this.#selected === "undefined") {
			let hoveredBase = this.getBaseByLocation(this.g.input.getX(), this.g.input.getY());
			if (typeof hoveredBase !== "undefined") {
				// Start drag method
				this.#selected = hoveredBase;
			}
		}
	}

	// Adds base to be managed by BaseManager (Adds it to game and makes it
	// available for selection by player and AIs)
	registerBase(base) {
		this.#bases.push(base);

		return base;
	}

	unregisterBase(base) {
		// TODO datastructure
		for (var i = 0; i < this.#bases.length; i++) {
			if (this.#bases[i] === base) {
				this.#bases.splice(i, 1);
				return true;
			}
		}

		console.error("Attempted to deleted base that is not in BaseManager.bases", base);
		return false;
	}

	// Checks if selected bubbles are still owned, otherwise clears
	ensureOwner() {
		if (this.#selected !== undefined && this.#selected.team !== 1) {
			this.#selected = undefined;
		}
	}

	// Draw circle indicator arround selectedBubble and arrow
	selectedDrawing() {
		if(this.#selected !== undefined) {
			// Cancel if selected bubble has been captured in the meantime
			if(this.#selected.team !== 1) {
				this.#selected = undefined; return;
			}

			// Draw arrow from selected to cursor
			let r = this.#selected.width / 2;
			let inputX = this.g.input.getX();
			let inputY = this.g.input.getY();

			if (!collision.pointInCircle(inputX, inputY, this.#selected.x, this.#selected.y, r)) {
				let dx = inputX - this.#selected.x;
				let dy = inputY - this.#selected.y;
				let dist = Math.sqrt(dx**2 + dy**2);
				let ndx = dx / dist;
				let ndy = dy / dist;
				let startx = this.#selected.x + ndx*r;
				let starty = this.#selected.y + ndy*r;
				this.g.painter.ctx.strokeStyle = "white";
				this.g.painter.ctx.lineWidth = 3;
				this.g.painter.strokeLine(startx, starty, inputX, inputY);
			}

			// Highlight selected bubble
			this.g.painter.ctx.lineWidth = 2;
			this.g.painter.ctx.strokeStyle = "white";
			for(let i = 0; i < 5 + Math.abs(this.circleCounter - this.circleCounterMax/2); i+=3) {
				this.g.painter.strokeCircle(
							this.#selected.x,
							this.#selected.y,
							this.#selected.width / 2 + i,
							);
			}

			this.circleCounter = (this.circleCounter + 1) % this.circleCounterMax;
		}

	}
}
