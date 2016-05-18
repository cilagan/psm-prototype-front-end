import Ember from 'ember';

export default Ember.Route.extend({

//initial load of the model
  model() {

    let wizard = this.store.peekRecord('wizard');
    let self = this;
    if (null == wizard) { wizard = this.store.createRecord('wizard'); }

    return Ember.RSVP.hash({
      wizard: wizard,
      directorates: $.getJSON('propmgt/directorates'),
      fundingOps: $.getJSON('propmgt/fundingops'),
      divisions: $.getJSON('propmgt/divisions'),
      programs: $.getJSON('propmgt/programs')
    });

    /*return new Ember.RSVP.Promise(function(resolve, reject){
    self.store.findAll('wizard/funding-opportunity').then(function(fundingOps){
      self.store.findAll('wizard/division').then(function(divisions){
        console.log("CALL DIV");
        self.store.findAll('wizard/directorate').then(function(directorates){
          console.log("CALL PROG");
          self.store.findAll('wizard/program').then(function(programs){
            resolve({
              wizard:wizard,
              fundingOps:fundingOps,
              directorates:directorates,
              divisions:divisions,
              programs:programs
            });
          });
          console.log("EXIT CALL PROG");

        });
        console.log("EXIT CALL DIV");
        self.store.findAll('wizard/program');
      });
    });
  });*/
  /*  return Ember.RSVP.hash({
      wizard: wizard,
      directorates: this.store.findAll('wizard/directorate'),
      fundingOps: this.store.findAll('wizard/funding-opportunity'),

      divisions: this.store.findAll('wizard/division'),
      programs: this.store.findAll('wizard/program')
    });*/
  }

});
