import DS from 'ember-data';

import DocumentMetaData from '../document-meta-data/model';

export default DocumentMetaData.extend({

  proposalTitle: DS.attr('string'),

  // coverSheet: DS.belongsTo('cover-sheet', {async: true}),

  // projectDescription: DS.belongsTo('project-description', {async: true}),

  // dmp: DS.belongsTo('data-management-plan', {async: true}),
  // bioSketches: DS.hasMany('bio-sketch', {async: true})

});
