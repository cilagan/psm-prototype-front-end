import Ember from 'ember';
import $ from 'jquery';

export default Ember.Controller.extend({

  messages: Ember.computed(function() {
    return [];
  }),

  actions: {
    addMessage: function(message) {
      this.get('messages').pushObject(message);
    },
    clearMessages: function() {
      this.set('messages',[]);
    },
    uploadFiles: function(data) {
      // START A LOADING SPINNER HERE
      // let parentsData = this.modelFor('proposal');
      // let proposalId = parentsData.tempPropId;
      debugger;

      $.ajax({
        // url: '/docService/proposal/'+ this.model.tempPropId +'/projdesc',
        url: 'http://localhost:80/docService/proposal/1008698/projdesc',
        type: 'POST',
        data: data,
        cache: false,
        // dataType: 'json', //if JSON is coming back
        processData: false, // Don't process the files
        contentType: false, // Set content type to false as jQuery will tell the server its a query string request
        success: function(data, textStatus, jqXHR) {
          debugger;
          if(typeof data.error === 'undefined') {
              // Success so call function to process the form
              //submitForm(event, data);
          }
          else {
              // Handle errors here
              console.log('ERRORS: ' + data.error);
          }
        },
        error: function(jqXHR, textStatus, errorThrown) {
          debugger;
          // Handle errors here
          console.log('ERRORS: ' + textStatus);
          // STOP LOADING SPINNER
        }
    });
    }
  }

});
