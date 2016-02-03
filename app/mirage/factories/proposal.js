import Mirage from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  tempPropId(i) { return  i+1; },
  proposalTitle(i) { return `Proposal Title ${i+1}`; },
  coverSheet(i) {return i+1;}
});
