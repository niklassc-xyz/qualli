class RoomMenuMain extends Room{
	constructor(){
		super();
		this.background = spr_bgMenu;

		this.n_step = 0;

		let rooms = [room0,
                     room1,
                     room2,
                     room3,
                     room4,
                     room5,
                     room6,
                     room7,
                     room8,
                     room9,
                     room10,
                     room11,
                     room20,
                     room21,
                     room22,
                     room23];

		this.addToObjList(new Button("←", 42, roomHeight - 128, 90, 90, function(){ room_goto(MenuOverview); } )).setFontSize(24) ;

		let buttonWidth = 128;
		let buttonHeight = 128;
		let buttonMargin = 16;



		//  let itemsInRow = 12;
		let itemsInRow = 4;
		let itemsinColumn = Math.ceil(rooms.length / itemsInRow)



		// Calculate start margin in order to center the items block
		let rowWidth = ((itemsInRow-1) * buttonMargin + itemsInRow * buttonWidth);
		let marginLeft = (roomWidth - rowWidth) / 2;

		let columnHeight = ((itemsinColumn-1) * buttonMargin + itemsinColumn * buttonHeight);
		let marginTop = (roomHeight - columnHeight) / 2;

		for(let i = 0; i < itemsinColumn; i++)
			for(let j = 0; j < itemsInRow && i*itemsInRow + j < rooms.length; j++) {
				this.addToObjList(new Button(
					i*itemsInRow + j,
					marginLeft + j * (buttonWidth + buttonMargin),
					marginTop + i * (buttonHeight + buttonMargin),
					buttonWidth,
					buttonHeight,
					function() { room_goto(rooms[i*itemsInRow + j]) },
					(i*itemsInRow + j - 1 < 0) ? false : (storage.get(rooms[i*itemsInRow + j - 1].name + "W") == "") ? true : false
				)).setFontSize(36);
			}

	}

	draw() {
		super.draw()

		ctx.lineWidth = 4 * ((xScalar + yScalar) / 2);
		ctx.font = Math.round(42 * ((xScalar + yScalar) / 2)) + "px fnt_Comforta_Light";
		ctx.fillStyle = "white"
		ctx.textAlign = "center";
		// ctx.strokeText("Main", roomWidth/2 * xScalar, 140 * yScalar)
		ctx.fillText("Main", roomWidth/2 * xScalar, 32 * yScalar)
	}
}
