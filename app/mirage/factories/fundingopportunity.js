import Mirage from 'ember-cli-mirage';

export default Mirage.Factory.extend({

  id(i) { return i; },
  title(i) { return `Funding Opportunity ${i}`; },
  // code(i) { return `CODE-${i}`; }
  directorates(i) {return [`${i}`, `${i+1}`];},
  divisions(i) {return [`${i}`, `${i+1}`];}

});
