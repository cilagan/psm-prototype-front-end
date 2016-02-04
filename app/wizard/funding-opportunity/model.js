import DS from 'ember-data';

export default DS.Model.extend({

  title: DS.attr('string'),
  code: DS.attr('string'),

  divisions: DS.hasMany('divisions', {async: true})

});
