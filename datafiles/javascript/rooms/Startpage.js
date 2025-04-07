import Room from "./Room.js";
import Button from "../objects/Button.js";
import * as f from "../functions.js";
import Settings from "../parapluie/Settings.js";
import SimBubbleEmitter from "../objects/SimBubble/SimBubbleEmitter.js";
import MenuOverview from "../rooms/MenuOverview.js";
import Sunshine from "../objects/Sunshine.js";

export default class Startpage extends Room {
	constructor(g) {
		super(g);


		this.addObject(new SimBubbleEmitter(this.g));

		this.n_step = 0; // TODO is this needed → use stepCount

		var buttonWidth = 256;
		var buttonHeight = 192;
		var buttonMargin = 128;

		this.addObject(new Button(this.g, "Start", g.roomWidth / 2 - buttonMargin - (3/2) * buttonWidth, g.roomHeight / 2 - buttonHeight / 2, buttonWidth, buttonHeight, () => { g.gotoRoom(MenuOverview) }  )).borderColour = "yellow";
		this.addObject(new Button(this.g, "Vollbild", g.roomWidth / 2 - buttonWidth / 2, g.roomHeight / 2 - buttonHeight / 2, buttonWidth, buttonHeight, f.toggleFullscreen ));
		this.addObject(new Button(this.g, "Settings", g.roomWidth / 2 + buttonMargin + buttonWidth / 2, g.roomHeight / 2 - buttonHeight / 2, buttonWidth, buttonHeight, Settings.show));

		this.addObject(new Sunshine(this.g, g.roomWidth / 2, -400));
	}

	draw() {
		super.draw();

		// Title
		this.g.ctx.strokeStyle = "#ffffff";
		this.g.ctx.font = "175px fnt_Comforta_Light";
		this.g.ctx.textAlign = "center";
		this.g.ctx.lineWidth = 8;
		let fill = 0.9

		let animationN = 16
		let animationSpeed = 0.3
		let blur = this.g.stepCount * animationSpeed % animationN
		blur = Math.abs(blur - animationN/2)
		// Normalize
		blur = blur / (animationN/2)
		blur = 2 + 4*blur

		this.g.ctx.filter = `blur(${blur}px)`;

		// Blur
		this.g.ctx.strokeStyle = `rgba(210, 230, 255, ${fill})`;
		this.g.ctx.filter = "none";


		// Shadow
		this.g.ctx.fillStyle = `rgba(100, 100, 100, ${fill})`;
		this.g.ctx.fillText("Qualli", this.g.roomWidth/2 + 4, 148 + 4);

		// Gradient
		const grad = this.g.ctx.createLinearGradient(300, 0, (this.g.roomWidth-300), (500 + blur*100));
		// grad.addColorStop(0, "#b8f0ec");
		// grad.addColorStop(1, "#139964");

		// grad.addColorStop(0, "#b8f0ec");
		// grad.addColorStop(1, "#139964");

		grad.addColorStop(0, "#7CE0F3");
		grad.addColorStop(1, "#125B9D");

		// Main text
		this.g.ctx.fillStyle = grad;
		this.g.ctx.fillText("Qualli", this.g.roomWidth/2, 148);

		this.n_step++; // TODO remove


		// TODO remove
		if (Settings.debug) {
			this.g.ctx.lineWidth = 5;
			this.g.ctx.strokeStyle = 'white';
			this.g.ctx.fillStyle = "white";
			for(var i = 0; i < 5; i++){
				this.g.ctx.beginPath();
				this.g.ctx.arc(this.g.roomWidth / 2, this.g.roomHeight - 64, i * ((this.g.ctx.lineWidth-1)*2), (this.n_step* (i*0.01+0.1)) + 1.25 * Math.PI, (this.n_step*(i*0.01+0.1)) + 1.75 * Math.PI, false);
				this.g.ctx.stroke();
				this.g.ctx.beginPath();
				this.g.ctx.arc(this.g.roomWidth / 2, this.g.roomHeight - 64, this.g.ctx.lineWidth+i * ((this.g.ctx.lineWidth-1)*2), -(this.n_step* (i*0.01+0.1)) + 1.25 * Math.PI, -(this.n_step*(i*0.01+0.1)) + 1.75 * Math.PI, false);
				this.g.ctx.stroke();
			}
		}
	}
}
