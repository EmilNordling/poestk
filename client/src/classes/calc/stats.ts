import readFromTree from './readFromTree';
import { getCurrentTabData } from '../pst/publicAPI';
import { statsStack } from './genericCalculations';

function indexStats() {
  console.log(statsStack())
}

function getIntelligence(e): string {
  console.log(e);


}

function getStrength(): string {

}

function getDexterity(): string {

}

export {
  getIntelligence,
  getStrength,
  getDexterity,
};

export default indexStats;
