import DS from 'ember-data';

export default DS.Model.extend({

  title: DS.attr('string'),
  // code: DS.attr('string'),

  directorates: DS.attr(),

  divisions: DS.hasMany('wizard/division', {async: true}),

  // let Person = Ember.Object.extend({
  isEqual(other) {
    if (other) {
      return this.id === other.id;
    } else { return false; }

  }
// });

});
