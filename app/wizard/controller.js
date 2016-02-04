import Ember from 'ember';

export default Ember.Controller.extend({

  //Wizard Steps
  selectFundingOp: true,
  selectDivisionProgram: false,
  selectTypeFunding: false,


  // states = ['selectFundingOp', 'selectDivisionProgram'];
  // currentState = states[0];


  actions: {
    toFundingOp: function() {
      this.set('selectFundingOp', true);
      this.set('selectDivisionProgram', false);
      this.set('selectTypeFunding', false);
    },

    toDivisionProgram: function() {
      this.set('selectFundingOp', false);
      this.set('selectDivisionProgram', true);
      this.set('selectTypeFunding', false);
    },

    toTypeFunding: function() {
      this.set('selectFundingOp', false);
      this.set('selectDivisionProgram', false);
      this.set('selectTypeFunding', true);
    }
  }


});
