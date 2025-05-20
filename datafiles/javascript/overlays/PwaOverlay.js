import Overlay from "../parapluie/OverlayManager/Overlay.js";

// TODO higher zindex than ratioOverlay

export default class PwaOverlay extends Overlay {
	constructor(deferredPrompt) {
		const html = `
			<h1>Install</h1>
			<input type="button" id="installButton" value="Install PWA" />
		`;

		super(html);

		const installButton = this._divContent.querySelector("#installButton");

		// Prevent the default mini-infobar (optional)
		// e.preventDefault();

		installButton.onclick = () => { deferredPrompt.prompt(); this.remove(); };
	}
}
