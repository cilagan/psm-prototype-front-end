import DS from 'ember-data';

export default DS.JSONSerializer.extend(DS.EmbeddedRecordsMixin, {
  primaryKey: 'divisionCode',
  attrs: {
    description: 'divisionDesc',
    programs: { embedded : 'always' }
  },
  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
    console.log("DIV PAYLOAD INIT");
    console.log(payload);
    for(var i=0; i < payload.length; i++){
      console.log(payload[i].programElementList);
      payload[i].programs = payload[i].programElementList;
      delete payload[i].programElementList;
    }
    console.log("DIV PAYLOAD");
    console.log(payload);
    return this._super(store, primaryModelClass, payload, id, requestType);
  }
});
