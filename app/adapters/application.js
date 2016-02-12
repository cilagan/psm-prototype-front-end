import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  namespace: 'docService'
  // host: 'http://localhost:80'
});
