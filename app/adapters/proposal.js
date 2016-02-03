
import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({

  buildURL: function (modelName, id, snapshot, requestType, query) {
    let url = this._super();
    switch (requestType) {

      case 'findRecord':
        url += '/proposal/'+id+'/metadata';
        return url;

      // case 'deleteRecord':
      //   url += '/delete';
      // case 'createRecord':
      // // case 'findRecord':
      // case 'updateRecord':
      //   url += '/proposal/'+id;
      //   return url;
      case 'findAll':
        url += '/proposals';
        return url;
    }
  }

});
