function decode(str: string) {
	const decoded = atob(str.replace(/-/g, '+').replace(/_/g, '/'));
	const nodes = [];
	const version = decoded.charCodeAt(0) *
		16777216 +
		decoded.charCodeAt(1) *
		65536 +
		decoded.charCodeAt(2) *
		256 +
		decoded.charCodeAt(3);

	if (version > 4) throw new Error('Invalid Skill Tree version');

	const characterClass = decoded.charCodeAt(4);

	for (let i = 1; i < decoded.length; i += 2) {
		nodes.push(decoded.charCodeAt(i) * 256 + decoded.charCodeAt(i + 1));
	}

	return {
		nodes,
		characterClass,
	};
}

export default decode;
