import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    previous: function() {
      this.sendAction('previous');
    },
    setType: function(type) {
      let wizard = this.get('wizard');
      wizard.set('type', type);
    },
    setFundingMech: function(fundingMech) {
      let wizard = this.get('wizard');
      wizard.set('fundingMech', fundingMech);
    }
  }

});
