
import ApplicationAdapter from '../application';

export default ApplicationAdapter.extend({
  namespace: 'propmgt',

  buildURL: function (modelName, id, snapshot, requestType) {
    let url = this._super();
    switch (requestType) {
      case 'query':
      case 'findAll':
        url += '/divisions';
        return url;
      case 'findRecord':
        url += '/division/'+id;
        return url;
    }
  }

});
