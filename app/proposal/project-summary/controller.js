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
    saveProjSumm: function(data) {
      debugger;

      $.ajax({
        url: '/Section/projsumm',
          // url: 'http://localhost:80/Section/projsumm',
        type: 'POST',
        data: data,
        // data: JSON.stringify(data),
        contentType: "application/json",
        // contentType: false,
        cache: false,
        processData: false,
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
