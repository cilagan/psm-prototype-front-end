import Ember from 'ember';
import $ from 'jquery';

export default Ember.Route.extend({
  model: function() {
    return $.getJSON('/docService/proposals').then(function(json){
      return json.proposals;
    /*}, function() {*/ //TODO if the response is not JSON

    });
    // return this.store.findAll('proposal');
  }
});
