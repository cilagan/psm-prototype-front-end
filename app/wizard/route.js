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
      divisions: this.store.findAll('wizard/division'),
      programs: this.store.findAll('wizard/program')
    });
  }

});
