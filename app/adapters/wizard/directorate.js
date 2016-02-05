
import ApplicationAdapter from '../application';

export default ApplicationAdapter.extend({

  buildURL: function (modelName, id, snapshot, requestType) {
    let url = this._super();
    switch (requestType) {
      case 'findAll':
        url += '/directorates';
        return url;
    }
  }

});
