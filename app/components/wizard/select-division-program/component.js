import Ember from 'ember';

export default Ember.Component.extend({
 store: Ember.inject.service(),
 workingDivs: [],
 workingProgs: [],
 currDivSelection: null,
 currProgSelection: null,

  willInsertElement: function() {
    this.set('workingDivs', this.get('workingDivisions'));
  },

  actions: {
    next: function() {
      this.sendAction('next');
    },
    previous: function() {
      this.sendAction('previous');
    },
    selectDivision: function(divisionIndex) {
      let divs = this.get('workingDivs');
      let division = divs.objectAt(divisionIndex);
      this.set('currDivSelection', division);

      let programs = division.get('programs');
      this.set("workingProgs", programs);
    },
    selectProgram: function() {

    }
  }

});
