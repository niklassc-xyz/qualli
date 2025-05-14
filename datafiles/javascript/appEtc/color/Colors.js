import Color from "./Color.js";

// Stores team colors

export default class Colors {
	static team = [
		new Color(255, 255, 255, 0.6),
		new Color(211, 47, 47, 0.6),
		new Color(48, 63, 159, 0.6),
		new Color(56, 142, 60, 0.6),
		new Color(251, 192, 45, 0.6),
	];

	static healthbarGreen = new Color(69, 153, 36, 1);
	static healthbarRed = new Color(255, 68, 119, 1.0);
}
