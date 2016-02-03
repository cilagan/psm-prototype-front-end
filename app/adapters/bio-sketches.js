// import ApplicationAdapter from './application';
//
// export default ApplicationAdapter.extend({
// 
//   namespace: 'docService',
//
//   buildURL: function (modelName, id, snapshot, requestType, query) {
//     var url = this._super();
//     switch (requestType) {
//       case 'deleteRecord':
//         url += '/delete';
//       case 'createRecord':
//       case 'findRecord':
//       case 'updateRecord':
//         url += '/proposal/'+id+'/cover-sheet';
//         return url;
//     }
//   }
//
// });
