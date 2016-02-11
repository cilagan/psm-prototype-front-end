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
  sortProperty: null,
  prevSortProp: null,

  willInsertElement: function() {
    this.set('originalList', this.get('fundingOps'));
  },

  getFilteredModels: function(titleFilter, idFilter) {
    if (this.originalList == null) {
      return [];
    }

    var output = [];

    var regexTitle = new RegExp(this.escapeRegExp(titleFilter), 'i');
    var regexId = new RegExp(this.escapeRegExp(idFilter), 'i');

    this.originalList.forEach(function(m) {
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
    this.set('visibleFundingOps', (titleFilter === "" && idFilter === "") ? this.originalList : this.getFilteredModels(titleFilter, idFilter));
  }.observes('titleFilter', 'idFilter', 'originalList.isLoaded'),

//   obsCheckboxes: function(){
//     alert("Something was checked");
//     // this.set('checkedList', this.model.filterBy('isChecked', true));
//   // }.observes('directorates'),
// }.observes('this.selectedDirectorates'),


  actions: {
    next: function() {
      this.sendAction('next');
    },
    setFundingOp: function(fundingOp) {
      let wizard = this.get('wizard');
      wizard.set('fundingOp', fundingOp);
    },
    updateSelection: function(directorate) {
      this.get('selectedDirectorates').pushObject(directorate);
    }
  }
});
