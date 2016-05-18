import Ember from 'ember';
import $ from 'jquery';

export default Ember.Route.extend({
  model(params) {

    // return $.getJSON('/docService/proposal/'+params.proposal_id+'/metadata').then(function(json) {
    //   return json.proposal;
    // });
  }
});
