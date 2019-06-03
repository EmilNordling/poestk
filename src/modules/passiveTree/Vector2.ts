export type Vector2 = {
	x: number,
	y: number,
	set: (x: number, y: number) => void,
};

function vector2(x: number, y: number): Vector2 {
	const vector = Object.create({ x, y });

	return Object.freeze({
		x: vector.x,
		y: vector.y,
		set(x: number, y: number) {
			vector.x = x;
			vector.y = y;
		},
	});
}

export default vector2;
