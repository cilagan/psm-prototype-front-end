import Ember from 'ember';

export default Ember.Controller.extend({
  proposals: Ember.computed.alias('model'),

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
