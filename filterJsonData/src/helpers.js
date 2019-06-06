function has(property, key) {
  if (property === undefined) return false;

  return Object.hasOwnProperty.call(property, key);
}

function each(object, callback) {
  Object.keys(object).forEach(callback);

  return object;
}

module.exports = {
  has,
  each,
};
