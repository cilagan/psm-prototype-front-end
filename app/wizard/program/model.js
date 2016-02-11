import DS from 'ember-data';

export default DS.Model.extend({

  description: DS.attr('string'),
  code: DS.attr('string'),
  divisions: DS.belongsTo('wizard/division', {async: true})

});
