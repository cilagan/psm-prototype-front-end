import Ember from 'ember';
import $ from 'jquery';

export default Ember.Route.extend({

  model() {
    // let parentsData = this.modelFor('proposal');
    // let proposalId = parentsData.tempPropId;
    // return $.getJSON('/docService/proposal/'+proposalId+'/projsumm').then(function(json) {
    //   return json["project-summary"][0];
    // });

    return $.getJSON('/Section/projsumm');
  }
});
