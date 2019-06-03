export type Vector3 = {
	x: number,
	y: number,
	z: number,
	set: (x: number, y: number) => void,
};

function vector3(x: number, y: number, z: number): Vector3 {
	const vector = Object.create({ x, y, z });

	return Object.freeze({
		x: vector.x,
		y: vector.y,
		z: vector.z,
		set(x: number, y: number) {
			vector.x = x;
			vector.y = y;
		},
	});
}

export default vector3;
