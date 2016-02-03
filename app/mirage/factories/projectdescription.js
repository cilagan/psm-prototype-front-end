import Mirage from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  tempPropId(i) { return  i+1; },
  content(i) { return `I am the ${i+1} Project Description.`;}

});
