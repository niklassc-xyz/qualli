class room21 extends LevelRoom {
	constructor() {
		super();

		this.background = spr_bg_0;

		this.addToObjList(new KI0(2));

		// 40

		let planetDistance = 200; // centre to cenre
		let itemsInRow = 6;

		// Calculate start margin in order to center the items block
		let rowWidth = (itemsInRow-1) * planetDistance;
		let startMargin = (roomWidth - rowWidth) / 2;

		for(let i = 0; i < 3; i++)
			for(let j = 0; j < itemsInRow; j++) {
				let newTeam = (i == 1) ? 2 : 1;
				let newP = this.addToObjList(new cls_Planet(startMargin + j * planetDistance, 160 + i * planetDistance, newTeam));
				newP.groesse = (i == 1) ? 2 : 1;
				newP.einheiten = 30;
				this.planetlist[i * itemsInRow + j] = newP;

			}

	}
}
