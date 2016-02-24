import Ember from 'ember';

export default Ember.Component.extend({

 allDivs: [], //all the divisions for the Funding Op

 chosenDivs: [], //[selectedDiv, array of availableDivs]

 selectedDivs: [],


  willInsertElement: function() {
    let allDivs = this.get('workingDivisions');
    this.set('allDivs', allDivs);
    if (Ember.isEmpty(this.chosenDivs)) {
      let firstDiv = [null , allDivs.slice(0)]; //chosenDiv, rest of the availableDivs
      this.chosenDivs.pushObject(firstDiv);
    }
  },

  availableDivs: function() {
    let allDivs = this.allDivs;
    let selectedDivs = this.selectedDivs;

    let output = [];

    if (Ember.isEmpty(selectedDivs)) {
      output = allDivs.slice(0);
    } else {
      allDivs.forEach(function(m) {
        if (!selectedDivs.contains(m)) {
          output.pushObject(m);
        }
      });
    }
    return output;
  },
  addDivBackToAvailableDivs: function(div) {
    let selectedDivs = this.selectedDivs;
    selectedDivs.removeObject(div);

    let chosenDivs = this.chosenDivs;
    chosenDivs.forEach(function(item, index) {
        let availableDivs = item[1];
        if (!availableDivs.contains(div)){
          availableDivs.pushObject(div);
        }
    });
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
        let chosenDivs = this.chosenDivs;

        let indices = divisionIndex.split("_");

        let chosenDivsIndex = indices[0];
        let divIndex = indices[1];

        //is something there?
        let previousDivChoice = chosenDivs[chosenDivsIndex][0];
        if (previousDivChoice !== null) {
          this.addDivBackToAvailableDivs(previousDivChoice);
        }

        let chosenDiv = (divIndex && !isNaN(divIndex)) ? chosenDivs[chosenDivsIndex][1][divIndex] : null;

        //set the chosenDiv
        let toSet = chosenDivs[chosenDivsIndex];
        Ember.set(toSet, "0", chosenDiv);

        if (chosenDiv !== null) {
          this.selectedDivs.pushObject(chosenDiv);

          //remove the chosenDiv from every other availableDivs
          chosenDivs.forEach(function(item, index) {
            if (item[0] !== chosenDiv) {
              let availableDivs = item[1];
              if (availableDivs.contains(chosenDiv)){
                availableDivs.removeObject(chosenDiv);
              }
            }
          });
      }

      if(Ember.isEmpty(chosenDiv.chosenPrograms)) {
        chosenDiv.addProgram();
      }

    },
    addDivision: function () {
      let chosenDivs = this.chosenDivs;
      let availableDivs = this.availableDivs();
      chosenDivs.pushObject([null, availableDivs]);
    },
    removeDivision: function(chosenDivIndex) {

      let chosenDivs = this.chosenDivs;
      let removeBundle = chosenDivs[chosenDivIndex];
      let removeDiv = removeBundle[0];

      chosenDivs.removeObject(removeBundle);

      if (removeDiv !== null){
        this.addDivBackToAvailableDivs(removeDiv);
      }
    },


    selectProgram: function(programIndex) {

      // let workingProgs = this.get("workingProgs");
      // let program = workingProgs.objectAt(programIndex);
      // let currentProgram = this.get('currProgSelection');
      // if (program !== currentProgram) {
      //   this.selectedPrograms.removeObject(currentProgram);
      //   this.set('currProgSelection', program);
      //   this.selectedPrograms.pushObject(program);
      // }
    },
    addProgramField: function(divisionIndex) {
      let chosenDivs = this.chosenDivs;
      let div = chosenDivs[divisionIndex][0];
      div.addProgram();
    },
    removeProgram: function(divisionIndex, programIndex) {
      let chosenDivs = this.chosenDivs;
      let div = chosenDivs[divisionIndex][0];

      div.removeProgram(programIndex);

    }
  }

});
