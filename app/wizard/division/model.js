import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({

  description: DS.attr('string'),
  programs: DS.hasMany('wizard/program', {async: true}),

  chosenPrograms: Ember.computed( function() { return []; } ), //[selectedProgram, arrayofAvailablePrograms]
  selectedPrograms: Ember.computed( function() { return []; } ),

  availablePrograms: function() {
    let allPrograms = this.get('programs');
    let selectedPrograms = this.get('selectedPrograms');

    let output = [];
    if (Ember.isEmpty(selectedPrograms)) {
      output = allPrograms.slice(0);
    } else {
      allPrograms.forEach(function(m) {
        if (!selectedPrograms.contains(m)) {
          output.pushObject(m);
        }
      });
    }
    return output;
  },
  addProgram: function () {
    // let chosenPrograms = this.get('chosenPrograms');
    let availablePrograms = this.availablePrograms();
    this.get('chosenPrograms').pushObject([null, availablePrograms]);
  },
  addProgramBackToAvailablePrograms: function(program) {
    let selectedPrograms = this.get('selectedPrograms');
    selectedPrograms.removeObject(program);

    let chosenPrograms = this.get('chosenPrograms');
    chosenPrograms.forEach(function(item/*, index*/) {
        let availablePrograms = item[1];
        if (!availablePrograms.contains(program)){
          availablePrograms.pushObject(program);
        }
    });
  },
  removeProgram: function(chosenProgramIndex) {
    let chosenPrograms = this.get('chosenPrograms');
    // if( chosenPrograms.length > 1 ) { //long enough to remove a program and still have at least one program
      let removeBundle = chosenPrograms[chosenProgramIndex];
      let removeProgram = removeBundle[0];
      chosenPrograms.removeObject(removeBundle);
      if (removeProgram !== null){
        this.addProgramBackToAvailablePrograms(removeProgram);
      }
    // }
  },
  selectProgram: function(programIndex, programChoiceIndex) {
    let chosenPrograms = this.get('chosenPrograms');

      //is something there?
      let previousProgramChoice = chosenPrograms[programIndex][0];
      if (previousProgramChoice !== null) {
        this.addProgramBackToAvailablePrograms(previousProgramChoice);
      }

      let chosenProgram = (programChoiceIndex && !isNaN(programChoiceIndex)) ? chosenPrograms[programIndex][1][programChoiceIndex] : null;

      //set the chosenProgram
      let toSet = chosenPrograms[programIndex];
      Ember.set(toSet, "0", chosenProgram);

      if (chosenProgram !== null) {
        this.get('selectedPrograms').pushObject(chosenProgram);

        //remove the chosenProgram from every other availablePrograms
        chosenPrograms.forEach(function(item/*, index*/) {
          if (item[0] !== chosenProgram) {
            let availablePrograms = item[1];
            if (availablePrograms.contains(chosenProgram)){
              availablePrograms.removeObject(chosenProgram);
            }
          }
        });
      }
  },

  clearSelectedPrograms: function() {
    this.set('selectedPrograms',[]);
    this.set('chosenPrograms',[]);
  }

});
