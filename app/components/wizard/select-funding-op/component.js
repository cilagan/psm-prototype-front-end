import Ember from 'ember';

export default Ember.Component.extend({

  //filter terms
  titleFilter: "",
  idFilter: "",

  //original results
  originalList: [],
  selectedDirectorates: [],

  //sorting
  sortAscending: true,
  sortProperty: "id",
  prevSortProp: null,

  //messages
  errorMessage: null,

  willInsertElement: function() {
    this.set('originalList', this.get('fundingOps'));
    this.set('selectedDirectorates', this.get('directorates').slice(0));
    let wizard = this.get('wizard');
    let currentFundingOp = wizard.get('fundingOp');
    if (currentFundingOp) {
      this.set('fundingOpChoice', currentFundingOp);
    }
  },

  getFilteredModels: function(titleFilter, idFilter) {
    if (this.originalList == null) {
      return [];
    }

    var output = [];

    var regexTitle = new RegExp(this.escapeRegExp(titleFilter), 'i');
    var regexId = new RegExp(this.escapeRegExp(idFilter), 'i');

    this.visibleFundingOps.forEach(function(m) {
      let add = true;

      if (titleFilter !== "" && !regexTitle.test(m.get('title'))) {
        add = false;
      }

      if (idFilter !== "" && !regexId.test(m.get('id'))) {
        add = false;
      }

      if (add) {
          output.pushObject(m);
      }
    });

    return output;
  },
  escapeRegExp: function(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  },

  liveFilter: function() {
    var titleFilter = this.get('titleFilter').trim();
    var idFilter = this.get('idFilter').trim();
    this.checkData();
    this.set('visibleFundingOps', (titleFilter === "" && idFilter === "") ? this.visibleFundingOps : this.getFilteredModels(titleFilter, idFilter));
  }.observes('titleFilter', 'idFilter', 'originalList.isLoaded', 'selectedDirectorates.[]'),


  sortData: function(){
    if ( this.sortProperty === null ){
        Ember.Logger.warn(this.TAG, "sort property set to null");
        this.setProperties({
            sortAscending: true,
            prevSortProp: null
        });
        return;
    }

    var sortedArr = this.visibleFundingOps.sortBy(this.sortProperty);

    if ( this.prevSortProp === this.sortProperty ){
        var isAscending = this.sortAscending;
        if ( isAscending ) {
            sortedArr.reverse();
        }
        this.set('sortAscending', !isAscending);
    } else {
        this.set('sortAscending', true);
        this.set('prevSortProp', this.sortProperty);
    }
    this.set('visibleFundingOps', sortedArr);
  }.observes('sortProperty'),

  checkData: function() {
    if (this.selectedDirectorates.length === this.get('directorates').length) {
      this.set('visibleFundingOps', this.originalList);
    } else {
      let selectedDirectorates = this.selectedDirectorates;
      var output = [];

      this.originalList.forEach(function(m) {
        let fundingOpDirectorates = m.get('directorates');
        // selectedDirectorates.forEach(function(n)
        for (let n = 0; n < selectedDirectorates.length; n++){
          if (fundingOpDirectorates.indexOf(selectedDirectorates.get(n).id) >= 0) {
            if (output.indexOf(m) < 0 ) {
                output.pushObject(m);
            }
          }
        }
      });
      this.set('visibleFundingOps', output);
    }
  },


  actions: {
    next: function() {

      let wizard = this.get('wizard');
      let currentFundingOp = wizard.get('fundingOp');

      let fundingOpChoice = this.get('fundingOpChoice');

      if (fundingOpChoice === undefined) {
        this.set('errorMessage', "Pick a funding opportunity.");
      } else {
          if (!Ember.isEqual(fundingOpChoice, currentFundingOp)) {
            wizard.set('fundingOp', fundingOpChoice);
            wizard.set('chosenDivPrograms', null);
          }
          this.set('errorMessage', null);
          this.sendAction('next');
      }
    },
    sortBy: function (property) {
      if ( this.sortProperty === property ) {
        this.sortData();
      }
      else {
          this.set('sortProperty', property);
      }
    },
    checkAll: function() {
      this.set('selectedDirectorates', this.get('directorates').slice(0));
    },
    uncheckAll: function () {
      this.set('selectedDirectorates', []);
    }
  }
});
