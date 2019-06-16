import Axios from 'axios';
import PassiveNode from '../PassiveNode';
import { PassiveApiResponse } from './types';

class Matrix {
	public readonly nodes = new Map<number, PassiveNode>();

	public async popularize() {
		try {
			const response = await Axios.get<PassiveApiResponse.NodeData>('/treeData/3.7.0/nodeData.json');

			const { groups, nodes } = response.data;

			nodes.forEach(node => this.nodes.set(node.a, new PassiveNode(node)));
		} catch (error) {

		}
	}
}

export default Matrix;
