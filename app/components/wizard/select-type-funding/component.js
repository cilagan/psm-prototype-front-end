import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    previous: function() {
      this.sendAction('previous');
    }
  }

});
