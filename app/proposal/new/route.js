
import Ember from 'ember';

export default Ember.Route.extend({
  // model: function() {
  // },
  setupController: function(controller) {
    //this creates a blank model, in which you can put anything, check if valid later
    //and it doesn't add cache-sucking model to ember data which might not be saved
    controller.set('model', {});

  }
});
