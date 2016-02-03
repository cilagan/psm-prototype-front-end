import DS from 'ember-data';
import Ember from 'ember';


export default DS.RESTSerializer.extend({

// export default DS.JSONSerializer.extend({
//   normalize: function(typeClass, hash) {
//     var fields = Ember.get(typeClass, 'fields');
//     fields.forEach(function(field) {
//       var payloadField = Ember.String.camelize(field);
//       if (field === payloadField) { return; }
//
//       hash[field] = hash[payloadField];
//       delete hash[payloadField];
//     });
//     return this._super.apply(this, arguments);
//   }
});
