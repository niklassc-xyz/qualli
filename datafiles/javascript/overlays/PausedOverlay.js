import Overlay from "../parapluie/OverlayManager/Overlay.js";

export default class PausedOverlay extends Overlay {
	constructor() {
		const html = `
			<h1>Paused</h1>
			<div class="gridTwoCol">
				<input id="pResume" type="button" value="Resume ▶" onClick="g.unpause()" />
				<input id="pSettings" type="button" value="Settings ⚙" onClick="g.settings.show()" />
				<input id="pRestart" type="button" value="Restart ♻" onClick="if(g.room.restart(true) != false) { g.unpause() }" />
				<input id="pExit" type="button" value="Exit 🏳" onClick="g.room.surrender()" />
			</div>
		`;

		super(html);
	}
}
