import Ember from 'ember';

export default Ember.Controller.extend({

  //Wizard Steps
  selectFundingOp: true,
  selectDivisionProgram: false,
  selectTypeFunding: false,


  // states = ['selectFundingOp', 'selectDivisionProgram'];
  // currentState = states[0];


  actions: {

    /*State Flow Control*/
    toFundingOp: function() {
      this.set('selectFundingOp', true);
      this.set('selectDivisionProgram', false);
      this.set('selectTypeFunding', false);
    },

    toDivisionProgram: function() {
      this.set('selectFundingOp', false);
      this.set('selectDivisionProgram', true);
      this.set('selectTypeFunding', false);

      let model = this.get('model');

      let wizard = model.wizard;

      let fundingOp = wizard.get('fundingOp');

      let divisions = fundingOp.get('divisions');

      this.set("workingDivisions", divisions);

    },

    toTypeFunding: function() {
      this.set('selectFundingOp', false);
      this.set('selectDivisionProgram', false);
      this.set('selectTypeFunding', true);
    }
    /*End State Flow Control*/

  }


});
