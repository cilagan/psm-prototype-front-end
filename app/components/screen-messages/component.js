import Ember from 'ember';

export default Ember.Component.extend({

  infoMessages: Ember.computed('this.messages.[]', function() {
    return ( null !== this.get('messages') ) ? this.get('messages').filterBy('status', "info") : [];
  }),

  warningMessages: Ember.computed('this.messages.[]', function() {
    debugger;
    return ( null !== this.get('messages') ) ? this.get('messages').filterBy('status', "warning") : [];
  }),

  errorMessages: Ember.computed('this.messages.[]', function() {
    return ( null !== this.get('messages') ) ? this.get('messages').filterBy('status', "error") : [];
  })

});
