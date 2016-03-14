import Ember from 'ember';
import $ from 'jquery';

export default Ember.Route.extend({

  model() {
    let parentsData = this.modelFor('proposal');
    let proposalId = parentsData.tempPropId;
    return $.getJSON('/docService/proposal/'+proposalId+'/dmp/metadata').then(function(json) {
      return json["data-management-plan"][0];
    });
    // return this.store.findRecord('data-management-plan', params.proposal_id);
  }

});
