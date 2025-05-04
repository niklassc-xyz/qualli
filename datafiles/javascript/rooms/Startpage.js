import Room from "./../parapluie/Room.js";
import Button from "../parapluie/objects/util/Button.js";
import SimBubbleEmitter from "../objects/SimBubble/SimBubbleEmitter.js";
import MenuOverview from "../rooms/MenuOverview.js";
import Sunshine from "../objects/Sunshine.js";

export default class Startpage extends Room {
	constructor(g, returnRoom = undefined) {
		super(g, returnRoom);

		this.addObject(new SimBubbleEmitter(this.g, [120, 210, 255]));

		const heightPercentage = 3/5
		const buttonWidth = 300;
		const buttonHeight = 230;
		const buttonMargin = 100;

		const buttonStart = this.addObject(new Button(this.g, "Start", g.roomWidth / 2 - buttonMargin - (3/2) * buttonWidth, heightPercentage*g.roomHeight - buttonHeight / 2, buttonWidth, buttonHeight, () => { g.gotoRoom(MenuOverview) }  ));
		const buttonGuide = this.addObject(new Button(this.g, "Guide", g.roomWidth / 2 - buttonWidth / 2, heightPercentage*g.roomHeight - buttonHeight / 2, buttonWidth, buttonHeight, () => alert("TODO") ));
		const buttonSettings = this.addObject(new Button(this.g, "Settings", g.roomWidth / 2 + buttonMargin + buttonWidth / 2, heightPercentage*g.roomHeight - buttonHeight / 2, buttonWidth, buttonHeight, () => this.g.settings.show()));

		buttonStart.borderColour = "yellow";
		buttonStart.borderWidth = 3;
		buttonGuide.borderWidth = 3;
		buttonSettings.borderWidth = 3;

		this.addObject(new Sunshine(this.g, g.roomWidth / 2, -400));
	}

	draw() {
		super.draw();

		// Title
		this.g.painter.ctx.strokeStyle = "#ffffff";
		this.g.painter.ctx.font = "200px fnt_Comforta_Light";
		this.g.painter.ctx.textAlign = "center";
		this.g.painter.ctx.lineWidth = 8;
		let fill = 0.9

		let animationN = 16
		let animationSpeed = 0.3
		let blur = this.g.stepCount * animationSpeed % animationN
		blur = Math.abs(blur - animationN/2)
		// Normalize
		blur = blur / (animationN/2)
		blur = 2 + 4*blur

		this.g.painter.ctx.filter = `blur(${blur}px)`;

		// Blur
		this.g.painter.ctx.strokeStyle = `rgba(210, 230, 255, ${fill})`;
		this.g.painter.ctx.filter = "none";


		// Shadow
		this.g.painter.ctx.fillStyle = `rgba(100, 100, 100, ${fill})`;
		this.g.painter.ctx.fillText("Qualli", this.g.roomWidth/2 + 4, 148 + 4);

		// Gradient
		const grad = this.g.painter.ctx.createLinearGradient(300, 0, (this.g.roomWidth-300), (500 + blur*100));
		// grad.addColorStop(0, "#b8f0ec");
		// grad.addColorStop(1, "#139964");

		// grad.addColorStop(0, "#b8f0ec");
		// grad.addColorStop(1, "#139964");

		grad.addColorStop(0, "#7CE0F3");
		grad.addColorStop(1, "#125B9D");

		// Main text
		this.g.painter.ctx.fillStyle = grad;
		this.g.painter.ctx.fillText("Qualli", this.g.roomWidth/2, 148);


		// TODO remove
		if (this.g.getDebug()) {
			this.g.painter.ctx.lineWidth = 5;
			this.g.painter.ctx.strokeStyle = 'white';
			this.g.painter.ctx.fillStyle = "white";
			for(var i = 0; i < 5; i++) {
				this.g.painter.ctx.beginPath();
				this.g.painter.ctx.arc(this.g.roomWidth / 2, this.g.roomHeight - 64, i * ((this.g.painter.ctx.lineWidth-1)*2), (this.g.stepCount* (i*0.01+0.1)) + 1.25 * Math.PI, (this.g.stepCount*(i*0.01+0.1)) + 1.75 * Math.PI, false);
				this.g.painter.ctx.stroke();
				this.g.painter.ctx.beginPath();
				this.g.painter.ctx.arc(this.g.roomWidth / 2, this.g.roomHeight - 64, this.g.painter.ctx.lineWidth+i * ((this.g.painter.ctx.lineWidth-1)*2), -(this.g.stepCount* (i*0.01+0.1)) + 1.25 * Math.PI, -(this.g.stepCount*(i*0.01+0.1)) + 1.75 * Math.PI, false);
				this.g.painter.ctx.stroke();
			}
		}
	}
}
