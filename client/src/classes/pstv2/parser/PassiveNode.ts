import { PassiveNodeData } from '../index';

class PassiveNode {
  public size: number;
  public x: number;
  public y: number;
  public tab: any;
  public id: number;
  public groupID: number;
  public outNodes: PassiveNode[];
  public connection = {};

  constructor(data: PassiveNodeData) {
    this.tab = {
      0: {},
    };

    Object.keys(data).forEach((key) => {
      this[key] = data[key];
    });
  }
}

export default PassiveNode;
