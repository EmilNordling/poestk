const config = {
  context: 'src/json/3.7.0',
  dist: 'dist',
  spaces: process.env.NODE_ENV === 'production' ? 0 : 2,
};

module.exports = config;
