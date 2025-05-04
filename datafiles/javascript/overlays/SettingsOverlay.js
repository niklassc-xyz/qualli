import Overlay from "../parapluie/OverlayManager/Overlay.js";

export default class SettingsOverlay extends Overlay {
	constructor(debug, experimental, scaling, mute, jellyGlow) {
		const html = `
				<h1>Settings</h1>

				<div class="gridThreeCol" style="max-height: 50%;">
					<div>
						<label for="sMute">Mute</label>
						<input id="sMute" type="checkbox" onchange="g.settings.toggleMute()" />
					</div>
					<div>
						<label for="sScaling">Scaling</label>
						<!-- TODO intialize checkboxes in program -->
						<input id="sScaling" type="checkbox" onchange="g.settings.toggleScaling()" />
					</div>
					<div>
						<label for="sJellyGlow">Jelly Glow</label>
						<!-- TODO intialize checkboxes in program -->
						<input id="sJellyGlow" type="checkbox" onchange="g.settings.toggleJellyGlow()" />
					</div>
					<div>
						<label for="sExperimental">Experimental</label>
						<input id="sExperimental" type="checkbox" onchange="g.settings.toggleExperimental()" />
					</div>
					<div>
						<label for="sDebug">Debug</label>
						<input id="sDebug" type="checkbox" onchange="g.settings.toggleDebug()" />
					</div>
				</div>

				<div style="font-size: 0.9em; padding-top: 1em;">
					<input id="sReset" type="button" value="Reset Progress ♻" onClick="g.progressManager.reset()" />
					<input id="sClose" type="button" value="Close Settings ❌" onClick="g.settings.hide()" />
				</div>
		`;

		super(html);


		this._divContent.querySelector("#sDebug").checked = debug;
		this._divContent.querySelector("#sExperimental").checked = experimental;
		this._divContent.querySelector("#sScaling").checked = scaling;
		this._divContent.querySelector("#sMute").checked = mute;
		this._divContent.querySelector("#sJellyGlow").checked = jellyGlow;
	}
}
