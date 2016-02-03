
import DS from 'ember-data';

export default DS.Model.extend({

  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  text: DS.attr('string'),
  textLength: DS.attr('number'),

  proposal: DS.belongsTo('proposal')

});
