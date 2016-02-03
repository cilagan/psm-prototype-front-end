import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    delete(proposal) {
      let self = this;
      proposal.destroyRecord().then(() => {
        self.transitionToRoute('proposals');
      });
    }
  }

});
