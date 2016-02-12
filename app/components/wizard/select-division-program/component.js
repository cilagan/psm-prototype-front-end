import Ember from 'ember';

export default Ember.Component.extend({
 store: Ember.inject.service(),
 workingDivs: [],
 workingProgs: [],
 currDivSelection: null,
 currProgSelection: null,


//pull the divsions we need from the store/server
  /*init:function(){
    this._super();
    //get funding op selection from wizard
    let foId = this.get('wizard.fundingOp.code');

    //ref to the app store
    var store = this.get('store');

    //get a division record from the store. assume server returns associated divs for an opportunity for now
    //TODO: this needs to be query to find records based on foId
    let division = store.findRecord('wizard/division',1);
    //  let divisions = store.query('wizard/division', {filter: {code: 'DEB'}});

    //load division as a model(?)
    let divisionp = store.peekRecord('wizard/division',1);

    //let divisions = this.get('divisions');
    //this.set('divisions', division);
    console.log(divisionp);

    let programs = division.get('programs');
    console.log(programs);


  //  division.get('programs').then((programs) => {
  //    console.log(programs);



//    });

  //  var programs = divisions.get('programs');
    //var programs = store.query('wizard/program', {filter: {description: 'Program 6'}});
    //console.log(programs);
    //let divs = this.get('divisions');
    //this.set('programs', programs);


  },*/
  actions: {
    next: function() {
      this.sendAction('next');
    },
    previous: function() {
      this.sendAction('previous');
    },

  }

});
