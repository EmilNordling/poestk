const jsonfile = require('jsonfile');
const { DIST_LOCATION, ORBIT_RADIUS, SKILLS_PER_ORBIT } = require('../constants');

function groupToNode(nodes) {
  return new Promise(async (resolve, reject) => {
    try {
      const groupsData = await jsonfile.readFile(`${DIST_LOCATION}/groups.json`);
      const minX = await jsonfile.readFile(`${DIST_LOCATION}/min_x.json`);
      const minY = await jsonfile.readFile(`${DIST_LOCATION}/min_y.json`);

      Object.entries(groupsData).forEach(([key, value]) => {
        const groupX = value.x += -minX;
        const groupY = value.y += -minY;
        const groupNodes = value.n;

        for (const nodeId of groupNodes) {
          const node = nodes[nodeId];

          // node.o = "oidx"
          // node.n = "o"
          const arc = 2 * Math.PI * (node.o / SKILLS_PER_ORBIT[node.n]);

          const x = Math.round(
            ((groupX - (ORBIT_RADIUS[node.n] * Math.sin(-arc))) / 10) * 1e2,
          ) / 1e2;

          const y = Math.round(
            ((groupY - (ORBIT_RADIUS[node.n] * Math.cos(-arc))) / 10) * 1e2,
          ) / 1e2;

          node['A'] = [x, y, Math.round(arc * 1e2) / 1e2];
        }
      });

      resolve(nodes);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = groupToNode;
