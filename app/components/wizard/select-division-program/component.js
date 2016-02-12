import Ember from 'ember';

export default Ember.Component.extend({
 store: Ember.inject.service(),
 workingDivs: [],

 currDivSelection: null,
 currProgSelection: null,

 workingProgs: [],
 selectedPrograms: [],
 availablePrograms: [],

  willInsertElement: function() {
    this.set('workingDivs', this.get('workingDivisions'));
  },

  availablePrograms: function() {
    let allPrograms = this.workingProgs;
    let selectedPrograms = this.selectedPrograms;

    let output = [];

    if (Ember.isEmpty(selectedPrograms)) {
      this.set('availablePrograms', allPrograms);
    } else {
      this.allPrograms.forEach(function(m) {
        if (!selectedPrograms.contains(m)) {
          output.pushObject(m);
        }
      });
      this.set('availablePrograms', output);
    }
  }.observes('selectedPrograms.[]', 'workingProgs.isLoaded'),

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
    selectProgram: function(programIndex) {
      let workingProgs = this.get("workingProgs");
      let program = workingProgs.objectAt(programIndex);
      let currentProgram = this.get('currProgSelection');
      if (program !== currentProgram) {
        this.selectedPrograms.removeObject(currentProgram);
        this.set('currProgSelection', program);
        this.selectedPrograms.pushObject(program);
      }
    },
    addProgramField: function() {

    }
  }

});
