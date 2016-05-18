import Ember from 'ember';

export default Ember.Component.extend({

  errorMessage: null,

  allDivs: Ember.computed(function() {
    return [];
  }), //all the divisions for the Funding Op

  chosenDivs: Ember.computed(function() {
    return [];
  }), //[selectedDiv, array of availableDivs]

  selectedDivs: Ember.computed(function() {
    return [];
  }),

  chosenDivLengthMinusOne: Ember.computed('chosenDivs.[]', function() {
    return this.get('chosenDivs').length - 1;
  }),

  willInsertElement: function() {
    let wizard = this.get('wizard');
    let fundingOp = wizard.get('fundingOp');
    let divisions = this.get('divisions');
    // let divisions = fundingOp.divisions;
    // let divisions = fundingOp.get('divisions');

    debugger;
    this.set('allDivs', divisions);

    let wizardChosenDivs = wizard.get('chosenDivPrograms');

    if (Ember.isEmpty(wizardChosenDivs)) {
      let firstDiv = [null, divisions.slice(0)]; //chosenDiv, rest of the availableDivs
      this.get('chosenDivs').pushObject(firstDiv);
    } else {
      this.set('chosenDivs', wizardChosenDivs);
    }
  },

  availableDivs: function() {
    let allDivs = this.get('allDivs');
    let selectedDivs = this.get('selectedDivs');

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
    let selectedDivs = this.get('selectedDivs');
    selectedDivs.removeObject(div);

    let chosenDivs = this.get('chosenDivs');
    chosenDivs.forEach(function(item /*, index*/ ) {
      let availableDivs = item[1];
      if (!availableDivs.contains(div)) {
        availableDivs.pushObject(div);
      }
    });
  },

  setChosenDivsToWizard: function() {
    let wizard = this.get('wizard');
    let chosenDivs = this.get('chosenDivs');

    // let chosenDivPrograms = [];
    //
    // chosenDivs.forEach(function(d){
    //   chosenDivPrograms.pushObject(d[0]);
    // });

    wizard.set('chosenDivPrograms', chosenDivs);
  },

  actions: {
    next: function() {
      let chosenDivs = this.get('chosenDivs');
      let self = this;

      let errorMsg = "";

      //for each chosenDiv[i][0], <-- this is the div
      //get the chosenDiv[i][0].get('chosenPrograms'), <-- chosenPrograms
      //for each chosenPrograms[j][0] <-- this is the program
      chosenDivs.forEach(function(d) {
        let div = d[0];
        if (div === null) {
          self.send('removeDivision', chosenDivs.indexOf(d));
        } else {
          let chosenPrograms = div.get('chosenPrograms');
          chosenPrograms.forEach(function(p) {
            let program = p[0];
            if (program === null && chosenPrograms.length > 1) {
              chosenPrograms.removeObject(p);
            } else if (program === null && chosenPrograms.length === 1) {
              errorMsg += "<p>Every Division must have a Program selected.</p>";
            }
          });
        }
      });

      if (chosenDivs[0][0] === null) {
        errorMsg = "<p>Select a Division and a Program.</p>" + errorMsg;
      }

      if (errorMsg) {
        this.set('errorMessage', errorMsg.htmlSafe());
      } else {
        this.set('errorMessage', null);
        this.setChosenDivsToWizard();
        this.sendAction('next');
      }
    },
    previous: function() {
      let chosenDivs = this.get('chosenDivs');
      let self = this;

      //for each chosenDiv[i][0], <-- this is the div
      //get the chosenDiv[i][0].get('chosenPrograms'), <-- chosenPrograms
      //for each chosenPrograms[j][0] <-- this is the program
      chosenDivs.forEach(function(d) {
        let div = d[0];
        if (div === null) {
          self.send('removeDivision', chosenDivs.indexOf(d));
        } else {
          let chosenPrograms = div.get('chosenPrograms');
          chosenPrograms.forEach(function(p) {
            let program = p[0];
            if (program === null && chosenPrograms.length > 1) {
              chosenPrograms.removeObject(p);
            }
          });
        }
      });

      this.sendAction('previous');
    },

    selectDivision: function(divisionIndex) {
      let chosenDivs = this.get('chosenDivs');

      let indices = divisionIndex.split("_");

      let chosenDivsIndex = indices[0];
      let divIndex = indices[1];

      //is something there?
      let previousDivChoice = chosenDivs[chosenDivsIndex][0];
      if (previousDivChoice !== null) {
        previousDivChoice.clearSelectedPrograms();
        this.addDivBackToAvailableDivs(previousDivChoice);
      }

      let chosenDiv = (divIndex && !isNaN(divIndex)) ? chosenDivs[chosenDivsIndex][1][divIndex] : null;

      //set the chosenDiv
      let toSet = chosenDivs[chosenDivsIndex];
      Ember.set(toSet, "0", chosenDiv);

      if (chosenDiv !== null) {
        this.get('selectedDivs').pushObject(chosenDiv);

        //remove the chosenDiv from every other availableDivs
        chosenDivs.forEach(function(item /*, index*/ ) {
          if (item[0] !== chosenDiv) {
            let availableDivs = item[1];
            if (availableDivs.contains(chosenDiv)) {
              availableDivs.removeObject(chosenDiv);
            }
          }
        });
      }
      if (Ember.computed.empty('chosenDiv.chosenPrograms')) {
        chosenDiv.addProgram();
      }
    },
    addDivision: function() {
      let chosenDivs = this.get('chosenDivs');
      let availableDivs = this.availableDivs();
      chosenDivs.pushObject([null, availableDivs]);
    },
    removeDivision: function(chosenDivIndex) {
      let chosenDivs = this.get('chosenDivs');
      if (chosenDivs.length > 1) { //long enough to remove a div and still have at least one div
        let removeBundle = chosenDivs[chosenDivIndex];
        let removeDiv = removeBundle[0];
        chosenDivs.removeObject(removeBundle);
        if (removeDiv !== null) {
          removeDiv.clearSelectedPrograms();
          this.addDivBackToAvailableDivs(removeDiv);
        }
      }
    },
    selectProgram: function(index) {
      let indices = index.split("_");
      let divisionIndex = indices[0];
      let programIndex = indices[1];
      let programChoiceIndex = indices[2];
      let chosenDivs = this.get('chosenDivs');
      let div = chosenDivs[divisionIndex][0];
      div.selectProgram(programIndex, programChoiceIndex);
    },
    addProgramField: function(divisionIndex) {
      let chosenDivs = this.get('chosenDivs');
      let div = chosenDivs[divisionIndex][0];
      div.addProgram();
    },
    removeProgram: function(divisionIndex, programIndex) {
      let chosenDivs = this.get('chosenDivs');
      let div = chosenDivs[divisionIndex][0];
      div.removeProgram(programIndex);
    }
  }
});
