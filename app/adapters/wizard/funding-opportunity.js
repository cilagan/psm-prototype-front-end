
import ApplicationAdapter from '../application';

export default ApplicationAdapter.extend({
  namespace: 'propmgt',

  buildURL: function (modelName, id, snapshot, requestType) {
    let url = this._super();
    switch (requestType) {
      case 'findAll':
        url += '/fundingops';
        return url;
    }
  }

});
