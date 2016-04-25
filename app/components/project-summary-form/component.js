import Ember from 'ember';

export default Ember.Component.extend({

  didInsertElement() {
     this._super(...arguments);

     CKEDITOR.replace( 'overview' );
     CKEDITOR.replace( 'intellectual_merit' );
     CKEDITOR.replace( 'broader_impacts' );
  }

});
