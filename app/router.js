import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {

  this.route('proposals', {path: '/'});

  this.route('proposal', {path: '/proposal/:proposal_id'});

  // this.route('proposal', {path: '/proposal/:proposal_id'}, function() {
  //
  //   this.route('bio-sketch');
  //   this.route('bio-sketch', {resetNamespace: true});
  // });

  this.route('cover-sheet', {path: '/proposal/:proposal_id/cover-sheet'});
  this.route('project-description', {path: '/proposal/:proposal_id/project-description'});
  this.route('data-management-plan', { path: '/proposal/:proposal_id/dmp' });


  //Page Not Found
  this.route('page-not-found', { path: '/*wildcard' });

});

export default Router;
