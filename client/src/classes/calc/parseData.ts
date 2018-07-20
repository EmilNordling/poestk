import indexStats from './stats';
import getNewCharacter from './virutalCharacter';

const itemExample = `
Rarity: Rare
Onslaught Star
Hubris Circlet
--------
Quality: +20% (augmented)
Energy Shield: 117 (augmented)
--------
Requirements:
Level: 72
Dex: 159
Int: 154
--------
Sockets: G-R-B-B
--------
Item Level: 84
--------
Tornado Shot fires 2 additional secondary Projectiles
--------
34% increased Energy Shield
+25% to Fire Resistance
+45% to Lightning Resistance
+16% to Chaos Resistance
+57 to maximum Life
`;

function parseTreeData(node: PassiveNode) {
  if (typeof node.sd === 'undefined') return;

  getNewCharacter(1);
  // const test = Object.keys(node.sd)[0].match(/[^_]*/);

  // if (test !== null) {
  //   switch (test[0]) {
  //     case 's':
  //       indexStats();
  //   }
  // }
}

function parseItemData() {

}

export {
  parseTreeData,
  parseItemData,
};
