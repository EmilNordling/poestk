const config = {
  entries: ['ascClasses', 'passiveSkillTreeData'],
  // entries: 'test',
  contex: 'src/json/3.1.0',
  dist: 'dist',
  spaces: process.env.NODE_ENV === 'production' ? 0 : 2,
};

module.exports = config;
