import Ember from 'ember';

export default Ember.Component.extend({


  actions: {
    next: function() {
      this.sendAction('next');
    },
    setFundingOp: function(fundingOp) {
      let wizard = this.get('wizard');
      wizard.set('fundingOp', fundingOp);
    }
  }
});
