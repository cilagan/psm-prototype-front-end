import Ember from 'ember';
import $ from 'jquery';

export default Ember.Route.extend({

  model() {
    // return this.store.findRecord('project-description', params.proposal_id);

    let parentsData = this.modelFor('proposal');
    let proposalId = parentsData.tempPropId;
    return $.getJSON('/docService/proposal/'+proposalId+'/projdesc/metadata').then(function(json) {
      return json["project-description"][0];
    });
  }

});
