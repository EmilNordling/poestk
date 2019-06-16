const VERSION = '3.7.0';
const DIST_LOCATION = `${__dirname}/dist`;
const SPACES = process.env.NODE_ENV === 'production' ? 2 : 0;
const TREEDATA_LOCATION = `${__dirname}/json/${VERSION}`;
const TEMP_OBJECT = {};
const ORBIT_RADIUS = [0, 82, 162, 335, 493];
const SKILLS_PER_ORBIT = [1, 6, 12, 12, 40];

module.exports = {
	DIST_LOCATION,
	SPACES,
	TREEDATA_LOCATION,
	TEMP_OBJECT,
	ORBIT_RADIUS,
	SKILLS_PER_ORBIT,
};
