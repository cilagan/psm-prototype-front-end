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

  willInsertElement: function() {
    this.set('originalList', this.get('fundingOps'));
    this.set('selectedDirectorates', this.get('directorates').slice(0));
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
  }/*.observes('selectedDirectorates.[]')*/,


  actions: {
    next: function() {

      let wizard = this.get('wizard');

      if (wizard.get('fundingOp') === undefined) {
          alert("Pick a funding opportunity!");
      } else {
        this.sendAction('next');
      }
    },
    setFundingOp: function(fundingOp) {
      let wizard = this.get('wizard');
      wizard.set('fundingOp', fundingOp);
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


//   obsCheckboxes: function(){
//     alert("Something was checked");
//     // this.set('checkedList', this.model.filterBy('isChecked', true));
//   // }.observes('directorates'),
// }.observes('this.selectedDirectorates'),
