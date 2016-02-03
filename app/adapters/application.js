import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  namespace: 'docService'
  // host: 'http://localhost:80'
});
