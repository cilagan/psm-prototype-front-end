import DS from 'ember-data';

export default DS.Model.extend({

  description: DS.attr('string'),
  code: DS.attr('string'),
  fo: DS.attr('number'),
  //fundingOp: DS.belongsTo('funding-opportunity', {async: true})
  programs: DS.hasMany('wizard/program', {async: true})

});
