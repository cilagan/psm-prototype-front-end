import Ember from 'ember';

export default Ember.Route.extend({

  model(params) {
    return this.store.findRecord('project-description', params.proposal_id);
  }

// Ember.$.getJSON("http://localhost:80/docService/proposal/1234567/projdesc/metadata");

  // model: function () {
  //   let proposal = this.modelFor('proposal');
  //   let pd = proposal.get('projectDescription');
  //   return pd;
  // }

});
