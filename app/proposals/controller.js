import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    softDelete(proposal) {
      proposal.deleteRecord();
    },
    undoDelete(proposal) {
      proposal.rollbackAttributes();
    },
    confirmDelete(proposal) {
      let self = this;
      proposal.save();
    },
    //temporary
    delete(proposal) {
      proposal.destroyRecord();
    }

  }

});
