import ClientStore from './ClientStore';
import Emitter from './Emitter';
import { generateHash } from './hashShim';

class Allocate {
  constructor() {
    this.characterLevel = 100;
    this.extraSkillPoints = 24;
    this.pointsAllocated = 0;
    this.pointsMax = this.characterLevel + this.extraSkillPoints;

    this.historyMaxBuffer = 512;
    this.historyFirstEdit = [];
    this.history = [];
    this.historyLastEdit = [];

    this.numAllocatedAscendancySkills = 0;
    this.numAllocatedSkills = 0;

    Emitter.on('allocate', this.allocate.bind(this));
  }

  /**
   * @param {object} Passive object
   */
  allocate(node) {
    console.log(node);
    const targetedNode = node;
    const connections = Object.keys(targetedNode.connection);
    const tab = ClientStore.viewTab;
    const isAllocated = connections.filter(connection => connection in ClientStore.treeState[tab].allocated);

    if (this.pointsAllocated === this.pointsMax) return;

    if (ClientStore.treeState[tab].allocated[targetedNode.id] !== targetedNode) {
      if (isAllocated.length > 0) {
        // adds targetedNode to Clientstore.treeState<tab>.allocated
        ClientStore.treeState[tab].allocated[targetedNode.id] = targetedNode;

        // locks allocated branch with tragetedNode
        isAllocated.forEach((allocated) => {
          if (!targetedNode.connection[allocated].tab[tab].locked) targetedNode.connection[allocated].tab[tab].locked = {};

          targetedNode.connection[allocated].tab[tab].locked[targetedNode.id] = targetedNode;
        });

        Emitter.emit('redrawNode', targetedNode);
      } else {
        console.log('branch to this node / use highlighted branch');
      }
    } else if (!node.tab[tab].locked || Object.keys(node.tab[tab].locked).length === 0) {
      // removes targetedNode from Clientstore.treeState<tab>.allocated
      delete ClientStore.treeState[tab].allocated[targetedNode.id];

      // unlocks allocated branch with tragetedNode
      isAllocated.forEach((allocated) => {
        const PassiveInstance = targetedNode.connection[allocated];

        if (!targetedNode.connection[allocated].tab[tab].locked) return;

        delete PassiveInstance.tab[tab].locked[targetedNode.id];
      });

      Emitter.emit('redrawNode', targetedNode, true);
    } else {
      // TODO: add branch crawling
      console.log('is locked');
    }

    const startClass = ClientStore.treeState[tab].startClass;
    const ascendancy = ClientStore.treeState[tab].ascendancy;
    const allocated = Object.values(ClientStore.treeState[tab].allocated);
    allocated.shift();
    generateHash(startClass, ascendancy, allocated);
  }
}

export default new Allocate();
