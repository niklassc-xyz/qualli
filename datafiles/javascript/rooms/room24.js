class room24 extends LevelRoom {
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

		let amount = 10
		for(let i = 0; i < 3; i++)
			for(let j = 0; j < itemsInRow; j++) {
				if (j > 2) {
					continue;
				}

				let newTeam = (j < itemsInRow / 2) ? 1 : 2;
				let newP = this.addToObjList(new cls_Planet(startMargin + j * planetDistance, 160 + i * planetDistance, newTeam));
				// newP.groesse = (i == 1) ? 2 : 1;
				newP.groesse = 1;
				newP.einheiten = amount;
				this.planetlist.push(newP)
				// this.planetlist[i * itemsInRow + j] = newP;

			}

		let newP = this.addToObjList(new cls_Planet(startMargin + 4 * planetDistance, 160 + 1 * planetDistance, 2));
		newP.einheiten = 9.5 * amount;
		newP.groesse = 7;
		this.planetlist.push(newP);
	}
}
