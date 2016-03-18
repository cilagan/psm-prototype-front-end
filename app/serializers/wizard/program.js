import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  primaryKey: 'programElementCode',
  attrs: {
    description: 'programElementDesc'
  },
  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
    //TODO: remove this function, only used for logging
    console.log("PROG PAYLOAD");
    console.log(payload);
    return this._super(store, primaryModelClass, payload, id, requestType);
  },
  pushPayload(store, primaryModelClass, payload){
    store.pushPayload(primaryModelClass, payload);
  }
});
