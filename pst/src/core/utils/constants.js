const orbitRadius = [0, 82, 162, 335, 493];
const skillsPerOrbit = [1, 6, 12, 12, 40];
const nodeAngle = 0.017453293;

const nodeSize = 30;
const notableSize = 50;
const keystoneSize = 80;
const strokeSize = 13;

const theme = {
  dark: {
    path: '#545662',
    allocated: '#f43a46',
    nodeDefault: '#20232a',
    notableDefault: '#fdc163',
    keyStoneDefault: '#c200ff',
  },
};

const tileSize = 256;

export {
  orbitRadius,
  skillsPerOrbit,
  nodeAngle,
  nodeSize,
  notableSize,
  keystoneSize,
  strokeSize,
  theme,
  tileSize,
};
