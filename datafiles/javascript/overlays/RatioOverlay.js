import Overlay from "../parapluie/OverlayManager/Overlay.js";

export default class RatioOverlay extends Overlay {
	constructor() {
		const html = `
			<h1>Use Landscape Mode</h1>
			<center>🔄<center>
		`;

		super(html);
	}
}
