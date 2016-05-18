import Ember from 'ember';
import $ from 'jquery';

export default Ember.Controller.extend({

  messages: Ember.computed(function() {
    return [];
  }),

  isEmpty(str) {
    return (!str || 0 === str.length || /^\s*$/.test(str));
  },

  pdfAvailable: Ember.computed('this.model.overView', 'this.model.intulMerit', 'this.model.brodrImpt', function() {
      if (this.isEmpty(this.model.overView) || this.isEmpty(this.model.intulMerit) || this.isEmpty(this.model.brodrImpt)) {
        return 'disabled';
      }
    return '';
  }),

  actions: {
    addMessage: function(message) {
      this.get('messages').pushObject(message);
      //scroll to top
      $('html,body').animate({scrollTop: 0}, 'slow');
      // $('html,body').animate({scrollTop: $("#messageAnchor").offset().top}, 'slow');

    },
    clearMessages: function() {
      this.set('messages', []);
    },
    saveProjSumm: function(data) {
      let controller = this;

      $.ajax({
        url: '/Section/projsumm',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json",
        cache: false,
        processData: false,
        success: function(data, textStatus, jqXHR) {
          if(typeof data.error === 'undefined') {
            controller.set('model', data);
            let message = {status:"info", dismissable: true, message: "Changes saved."};
            controller.send('addMessage', message);
            // controller.addMessage(message);
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
