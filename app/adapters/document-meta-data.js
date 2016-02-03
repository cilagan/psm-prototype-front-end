import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({

  namespace: 'docService',

  buildURL: function (modelName, id, snapshot, requestType, query) {
    let url = this._super();

    let model = modelName.split('/')[1]; //proposal/cover-sheet


    switch (modelName) {
      case '':
      // model =
    }


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

});
