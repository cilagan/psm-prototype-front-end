import Ember from 'ember';

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
    }
  }

});
