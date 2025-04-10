/**
 * Returns a random element
 *
 * @param {Array.<T>} arr - Input array to choose element from
 * @returns {T} The random element from `arr`
 */
export function chooseRandom(arr) {
	let ri = Math.floor(arr.length * Math.random());
	return arr[ri];

}

export function radtodeg(rad) {
	return rad * (180 / Math.PI);
}
export function degtorad(deg) {
	return deg * (Math.PI / 180);
}

export function point_in_rectangle(px, py, x1, y1, x2, y2){
	if(px < x1 || py < y1 || px > x2 || py > y2) return false;
	return true;
}
export function rectangle_in_rectangle(a_x1, a_y1, a_x2, a_y2, b_x1, b_y1, b_x2, b_y2) {
	if(a_x1 <= b_x1){
		if(a_x2 < b_x1) return false;
	}else{
		if(b_x2 < a_x1) return false;
	}
	if(a_y1 <= b_y1){
		if(a_y2 >= b_y1) return true;
	}else{
		if(b_y2 >= a_y1) return true;
	}
	return false;
}

// TODO implement
// Checks if point (x,y) is in circle at (cx,cy) with radius r
export function pointInCircle(x, y, cx, cy, r) {
	// console.log(x, y, cx, cy, r);

	let dx = Math.abs(x - cx);
	let dy = Math.abs(y - cy);
	// let dist = Math.sqrt(dx^2 + dy^2); // TODO should use ** instead of ^

	// console.log(dist, r);
	// console.log();

	// return dist < r;

	return dx <= r && dy <= r;
}

// TODO implement
export function circleInCircle(x1, y1, r1, x2, y2, r2) {
	let dx = Math.abs(x1 - x2);
	let dy = Math.abs(y1 - y2);
	
	// Total radius
	rt = r1 + r2;
	return dx <= rt && dy <= rt;
}

export function pointDirection(x1, y1, x2, y2){ // Nicht getestet! FEHLERHAFT TODO
	let dx = x2 - x1;
	let dy = y2 - y1;

	return radtodeg(Math.atan2(dy, dx));

}

// Mathematical modulo
export function mMod(a, b) {
	return ((a % b + b) % b);
}

// TODO camelCase
/**
 * Draws a line from point (x1,y1) to (x2,y2) on g.ctx
 */
// export function draw_line(x1, y1, x2, y2) {
// 	g.ctx.beginPath();
// 	g.ctx.moveTo(x1, y1);
// 	g.ctx.lineTo(x2, y2);
// 	g.ctx.stroke();
// }

export function drawLine(ctx, x1, y1, x2, y2) {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

// TODO ctx as default value?
export function drawCircle(ctx, x, y, r, outline) {
	ctx.beginPath();
	ctx.arc(x, y, r, 0, 2 * Math.PI, false);
	if(outline)
		ctx.stroke();
	else
		ctx.fill();
}

// TODO fillCircle and strokeCircle
// TODO camelCase
// Put in static method of a graphics class
// export function draw_circle(x, y, r, outline) {
// 	drawCircle(globals.ctx, x, y, r, outline);
// }

// TODO camelCase
// TODO ctx should be handled the same in any draw-function
export function draw_roundrect(ctx, x, y, width, height, radius, fill, stroke) {
	if (typeof stroke == 'undefined') {
		stroke = true;
	}
	if (typeof radius === 'undefined') {
		radius = 5;
	}
	if (typeof radius === 'number') {
		radius = {tl: radius, tr: radius, br: radius, bl: radius};
	}else{
		var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
		for (var side in defaultRadius){
			radius[side] = radius[side] || defaultRadius[side];
		}
	}
	ctx.beginPath();
	ctx.moveTo(x + radius.tl, y);
	ctx.lineTo(x + width - radius.tr, y);
	ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
	ctx.lineTo(x + width, y + height - radius.br);
	ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
	ctx.lineTo(x + radius.bl, y + height);
	ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
	ctx.lineTo(x, y + radius.tl);
	ctx.quadraticCurveTo(x, y, x + radius.tl, y);
	ctx.closePath();
	if (fill){
		ctx.fill();
	}
	if (stroke){
		ctx.stroke();
	}
}

// // Checks if team has already lost
// // TODO move to room?
// export function checkIfLost(g, team) {
// 	for(var i = 0; i < g.room.objects.length; i++) {
// 		if(g.room.objects[i] instanceof Jelly || g.room.objects[i] instanceof Base) {
// 			if(g.room.objects[i].team === team) {
// 				return false;
// 			}
// 		}
// 	}
// 	return true;
// }
