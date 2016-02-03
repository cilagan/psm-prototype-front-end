import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({

  //every object for themselves!
  buildURL: function (modelName, id, snapshot, requestType, query) {
    let url = this._super();
    switch (requestType) {
      case 'deleteRecord':
        url += '/delete';
      case 'createRecord':
      case 'findRecord':
      case 'updateRecord':
        url += '/proposal/'+id+'/projdesc/metadata';
        return url;
    }
  }


  // find: function(id) {
  //   return Ember.$.getJSON("http://localhost:80/docService/proposal/"+id+"projdesc/metadata");
  // }

  /*
  //metadata buildURL
  buildURL: function (modelName, id, snapshot, requestType, query) {
    let url = this._super();
    alert(url);
    switch (requestType) {
      case 'deleteRecord':
        url += '/delete';
      case 'createRecord':
      case 'findRecord':
      case 'updateRecord':
        url += '/proposal/'+id+'/projdesc/metadata';
        return url;
    }
  }
  */

  /*
  //original buildURL
  buildURL: function (modelName, id, snapshot, requestType, query) {
    let url = this._super();
    switch (requestType) {
      case 'deleteRecord':
        url += '/delete';
      case 'createRecord':
      case 'findRecord':
      case 'updateRecord':
        url += '/proposal/'+id+'/projdesc';
        return url;
    }
  }
  */

});
