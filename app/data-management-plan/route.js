import Ember from 'ember';

export default Ember.Route.extend({

  model(params) {
    return this.store.findRecord('data-management-plan', params.proposal_id);
  }

  // model: function () {
  //   let proposal = this.modelFor('proposal');
  //   let dmp = proposal.get('dmp');
  //   return dmp;
  // }

});
