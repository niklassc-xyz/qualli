import Overlay from "../parapluie/OverlayManager/Overlay.js";

export default class EndgameOverlay extends Overlay {
	constructor(won, levelTime = -1) {
		const html = `
			<h1>Game Over</h1>
			<h2 id="egWon"></h2>
			<div id="egTime"></div>
			<br>
			<div class="gridThreeCol">
				<input id="egRestart" type="button" value="Restart ♻" onClick="g.room.restart(); g.hideEndgame();" />
				<input id="egResume" type="button" value="Resume ▶" onClick="g.hideEndgame();" />
				<input id="egExit" type="button" value="Exit 🚪" onClick="g.room.return(); g.hideEndgame()" />
			</div>
		`;

		super(html);

		this._divContent.querySelector("#egWon").innerHTML = won ? "won 🥳" : "lost 🤬";
		this._divContent.querySelector("#egTime").innerHTML = `${levelTime} seconds`
	}
}
