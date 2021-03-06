import DS from 'ember-data';

export default DS.Model.extend({

  fundingOp: DS.attr('wizard/funding-opportunity'),
  type: DS.attr('string'),
  fundingMech: DS.attr('string'),

  chosenDivPrograms: DS.attr() //[[Division, [Programs]]]

});
