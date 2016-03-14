import Ember from 'ember';

export default Ember.Component.extend({

  //messages
  errorMessage: null,

  fileList: Ember.computed(function() {
    return [];
  }),


  actions: {
    addFileToUpload: function(e) {
      let fileList = this.get('fileList');
      let file = e.target.files[0];
      // let fileSize = file.size;

      if (fileList.findBy("name", file.name) === undefined) {
        fileList.pushObject(file);
      } else {
        let message = {status:"warning", dismissable: true, message: "A file with name \""+file.name+"\" has already been queued for upload."};
        this.sendAction('addMessage', message);
      }
      e.target.value = '';
    },
    removeFileUpload(file) {
      let fileList = this.get('fileList');
      fileList.removeObject(file);
    },
    uploadFiles: function() {
      let data = new FormData();
      let fileList = this.get('fileList');

      fileList.forEach(function(m) {
        data.append(m.name, m);
      })

      this.sendAction('uploadFiles', data);
    }
  }

});

// on="change" action="addFileToUpload"
