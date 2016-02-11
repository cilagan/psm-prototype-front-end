import Ember from 'ember';

export default Ember.Route.extend({

//initial load of the model
  model() {

    let wizard = this.store.peekRecord('wizard');

    if (null == wizard) { wizard = this.store.createRecord('wizard'); }

    return Ember.RSVP.hash({
      wizard: wizard,
      directorates: this.store.findAll('wizard/directorate'),
      fundingOps: this.store.findAll('wizard/funding-opportunity'),
      divisions: null,
      programs: null
    });
  }/*,

  setupController: function(controller, model) {
    controller.set('wizard', model);
    // the "user_id" parameter can come from a global variable for example
    // or you can implement in another way. This is generally where you
    // setup your controller properties and models, or even other models
    // that can be used in your route's template
    controller.set('divisions', this.store.findAll('wizard/division'));
    controller.set('programs', this.store.findAll('wizard/program'));
},*/

});
