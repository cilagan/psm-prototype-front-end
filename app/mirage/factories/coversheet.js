import Mirage from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  tempPropId(i) { return  i+1; },
  // proposalTitle(i) { return `Proposal Title ${i+1}`; }

  content(i) { return `I am the ${i+1} Cover Sheet.`;},

  fundingMechanism(i) { return `Funding Mechanism ${i+1}`; },
  requestedBudgetAmount(i) { return i+100; },
  submissionDate() {return new Date();}

});
