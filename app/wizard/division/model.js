import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({

  description: DS.attr('string'),
  programs: DS.hasMany('wizard/program', {async: true}),

  chosenPrograms: [], //[selectedProgram, arrayofAvailablePrograms]
  selectedPrograms: [],

  availablePrograms: function() {
    let allPrograms = this.get('programs');
    let selectedPrograms = this.get('selectedPrograms');

    let output = [];
    if (Ember.isEmpty(selectedPrograms)) {
      output = allPrograms.slice(0);
    } else {
      this.allPrograms.forEach(function(m) {
        if (!selectedPrograms.contains(m)) {
          output.pushObject(m);
        }
      });
    }
    return output;
  },
  addProgram: function () {
    let chosenPrograms = this.chosenPrograms;
    let availablePrograms = this.availablePrograms();
    chosenPrograms.pushObject([null, availablePrograms]);
  },
  addProgramBackToAvailablePrograms: function(program) {
    let selectedPrograms = this.selectedPrograms;
    selectedPrograms.removeObject(program);

    let chosenPrograms = this.chosenPrograms;
    chosenPrograms.forEach(function(item, index) {
        let availablePrograms = item[1];
        if (!availablePrograms.contains(program)){
          availablePrograms.pushObject(program);
        }
    });
  },
  removeProgram: function(chosenProgramIndex) {

    let chosenPrograms = this.chosenPrograms;
    let removeBundle = chosenPrograms[chosenProgramIndex];
    let removeProgram = removeBundle[0];

    chosenPrograms.removeObject(removeBundle);

    if (removeProgram !== null){
      this.addProgramBackToAvailablePrograms(removeProgram);
    }
  },

  //methods
  clearSelectedPrograms: function() {
    this.selectedPrograms = [];
  }


});
