import Ember from 'ember';

export default Ember.Route.extend({

  model(params) {
    return this.store.findRecord('cover-sheet', params.proposal_id);
  }

  // model: function () {
  //   let proposal = this.modelFor('proposal');
  //   let coversheet = proposal.get('coverSheet');
  //
  //   return coversheet;
  // }

});
