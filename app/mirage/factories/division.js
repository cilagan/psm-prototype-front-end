import Mirage from 'ember-cli-mirage';

export default Mirage.Factory.extend({

  id(i) { return i; },
  title(i) { return `Division ${i}`; },
  code(i) { return `CODE-${i}`; }

});
