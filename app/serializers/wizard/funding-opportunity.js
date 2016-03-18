import DS from 'ember-data';
//import Ember from 'ember';

export default DS.JSONSerializer.extend(DS.EmbeddedRecordsMixin, {
    primaryKey: 'fundingOpportunityId',
    attrs: {
      title: 'fundingOpportunityTitle',
      directorates: { embedded : 'always'},
      divisions: { embedded : 'always' }
    },
    normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
      console.log("FUB PAYLOAD");
console.log(payload);
      for(var i=0; i < payload.length; i++){
        var dirIDs = [];
        payload[i].directorates = payload[i].directorateList;
        payload[i].divisions = payload[i].divisionList;
        for(var j=0; j < payload[i].directorates.length; j++){

          dirIDs.push(payload[i].directorates[j].directorateID);
        }

        payload[i].directorates = dirIDs;

        delete payload[i].divisionList;
        delete payload[i].directorateList;
        delete payload[i].fundingOpportunityType;
        delete payload[i].fundingOpportunityDeadline;
      }

      return this._super(store, primaryModelClass, payload, id, requestType);
    }
  });
