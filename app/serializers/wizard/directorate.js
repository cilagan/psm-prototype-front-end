import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  primaryKey: 'directorateID',
  attrs: {
    description: 'directorateDesc'
  },
  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {

        console.log("DIR PAYLOAD");
        console.log(payload);
    return this._super(store, primaryModelClass, payload, id, requestType);
  },

});
