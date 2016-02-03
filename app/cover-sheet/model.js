/*
* cover-sheet/model.js
*/
import DS from 'ember-data';

import DocumentMetaData from '../document-meta-data/model';

export default DocumentMetaData.extend({

  proposalTitle: DS.attr('string'),
  proposalStatus: DS.attr('string'),
  submissionDate: DS.attr('date'), //submitTimeStamp: DS.attr(''),
  fundingMechanism: DS.attr('string'),
  requestedBudgetAmount: DS.attr('number'),
  proposalDurationInMonth: DS.attr('number'),
  requestedStatingDate: DS.attr('date'),
  hasPreliminaryProposal: DS.attr('boolean'),

  // proposal: DS.belongsTo('proposal')

});
