import Ember from 'ember';
import $ from 'jquery';

//FOR-TESTING
/* globals CKEDITOR */

export default Ember.Component.extend({

  overview: "",
  intellectualMerit: "",
  broaderImpacts: "",

  willInsertElement() {
    this.set('overview', this.get('model.overView'));
    this.set('intellectualMerit', this.get('model.intulMerit'));
    this.set('broaderImpacts', this.get('model.brodrImpt'));
  },

  didInsertElement() {
     this._super(...arguments);

     CKEDITOR.replace( 'overview' );
     CKEDITOR.replace( 'intellectualMerit' );
     CKEDITOR.replace( 'broaderImpacts' );

  },

  isEmpty(str) {
    return (!str || 0 === str.length || /^\s*$/.test(str));
  },

  actions: {
    saveProjSumm: function(model) {

      this.sendAction('clearMessages');

      let overviewEmberId = $('textarea[name="overview"]:eq(0)').attr('id');
      let intellectualMeritEmberId = $('textarea[name="intellectualMerit"]:eq(0)').attr('id');
      let broaderImpactsEmberId = $('textarea[name="broaderImpacts"]:eq(0)').attr('id');

      // let overview = $( "#overviewId" ).html();
      let overview = CKEDITOR.instances[overviewEmberId].getData().trim();
      let intellectualMerit = CKEDITOR.instances[intellectualMeritEmberId].getData().trim();
      let broaderImpacts = CKEDITOR.instances[broaderImpactsEmberId].getData().trim();

      if (this.isEmpty(overview) || this.isEmpty(intellectualMerit) || this.isEmpty(broaderImpacts)) {
        let message = {status:"warning", dismissable: true, message: "Required fields are required."};
        this.sendAction('addMessage', message);
      } else {
        // let data = new FormData();
        // data.append("tempPropId", model.tempPropId);

        // data.append("tempPropId", "1059422");
        // data.append("id", "1234567");
        // data.append("overView", overview);
        // data.append("intulMerit", intellectualMerit);
        // data.append("brodrImpt", broaderImpacts);


        let data = {
           "id":model.id,
           "tempPropId":model.tempPropId,
           "lastUpdttmsp":null,
           "overView": overview,
           "intulMerit": intellectualMerit,
           "brodrImpt": broaderImpacts
        };

        this.sendAction('saveProjSumm', data);
      }


    }
  }

});
