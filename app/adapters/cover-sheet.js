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
        url += '/proposal/'+id+'/cover-sheet/metadata';
        return url;
    }
  }

});
