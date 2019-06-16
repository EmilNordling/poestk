const readFile = require('./readFile');

(async function() {
	await readFile('ascClasses');
	await readFile('passiveSkillTreeData');
})();
