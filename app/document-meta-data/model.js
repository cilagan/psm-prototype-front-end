import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({

  compositeId:  DS.attr('string'),
  tempPropId:   DS.attr('number'),
  seqNum:       DS.attr('number'),
  sectionType:  DS.attr('string'),
  fileName:     DS.attr('string'),
  size:         DS.attr('number'),
  pages:        DS.attr('number'),
  uploadDate:   DS.attr('date'),
  content:      DS.attr('string'),
  urlend:       DS.attr('string'),

  fileURL: Ember.computed('tempPropId', 'urlend', function() {
    return `http://localhost:80/docService/proposal/${this.get('tempPropId')}/${this.get('urlend')}`;
  })

  // length:       DS.attr('number'),
  // contentType:  DS.attr('string'),
  // md5:          DS.attr('string'),
});
