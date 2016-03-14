import Ember from 'ember';

export default Ember.Component.extend({

  //filter terms
  titleFilter: "",
  idFilter: "",

  //original results
  originalList: [],
  selectedDirectorates: [],
  modList: [],

  //sorting
  sortAscending: true,
  sortProperty: "id",
  prevSortProp: null,

  //messages
  errorMessage: null,

  willInsertElement: function() {
    this.set('originalList', this.get('fundingOps'));
    this.set('modList', this.get('fundingOps').slice(0));
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

    this.modList.forEach(function(m) {
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

  liveFilter: Ember.computed('titleFilter', 'idFilter', 'modList.isLoaded', 'modList.[]', /* 'selectedDirectorates.[]',*/ function() {

    // see what's checked
    //then sort OR then filter

    // this.checkData();

    var titleFilter = this.get('titleFilter').trim();
    var idFilter = this.get('idFilter').trim();
    if (titleFilter === "" && idFilter === "") {
      return this.modList;
    } else {
      this.resetCurrentPage();
      return this.getFilteredModels(titleFilter, idFilter);
    }
  }),

  recordsShown: Ember.computed('liveFilter', 'startRecord', 'endRecord', function() {
      return this.get('liveFilter').slice(this.get('startRecord'), this.get('endRecord'));
  }),

  liveFilterLength: Ember.computed('liveFilter', function() {
    return this.get('liveFilter').length;
  }),

  // sortData: Ember.computed('sortProperty', function() {
  sortData: function() {
    if (this.sortProperty === null) {
      Ember.Logger.warn(this.TAG, "sort property set to null");
      this.setProperties({
        sortAscending: true,
        prevSortProp: null
      });
      return;
    }
    var sortedArr = this.modList.sortBy(this.sortProperty);

    if (this.prevSortProp === this.sortProperty) {
      var isAscending = this.sortAscending;
      if (isAscending) {
        sortedArr.reverse();
      }
      this.set('sortAscending', !isAscending);
    } else {
      this.set('sortAscending', true);
      this.set('prevSortProp', this.sortProperty);
    }
    this.set('modList', sortedArr);
  }/*)*/.observes('sortProperty'),

  checkData: function() {
    if (this.selectedDirectorates.length === this.get('directorates').length) {
      this.set('modList', this.originalList);
    } else {
      let selectedDirectorates = this.selectedDirectorates;
      var output = [];

      this.originalList.forEach(function(m) {
        let fundingOpDirectorates = m.get('directorates');
        // selectedDirectorates.forEach(function(n)
        for (let n = 0; n < selectedDirectorates.length; n++) {
          if (fundingOpDirectorates.indexOf(selectedDirectorates.get(n).id) >= 0) {
            if (output.indexOf(m) < 0) {
              output.pushObject(m);
            }
          }
        }
      });
      this.set('modList', output);
    }
    this.resetCurrentPage();
  }.observes('selectedDirectorates.[]'),

  //pagination
  currentPage: 1,
  currentPageSize: {
    value: 10,
    label: "show 10"
  },
  pageSizes: [
    {value: 10, label: "show 10"},
    {value: 50, label: "show 50"},
    {value: 100, label: "show 100"},
    {value: 262144, label: "show all"}
  ],
  // totalPages: 1,

  resetCurrentPage: function() {
    this.set('currentPage', 1);
  },

  startRecord: Ember.computed('endRecord', function() {
    let start = this.get('endRecord') - this.currentPageSize.value;
    return start;
  }),

  endRecord: Ember.computed('currentPage', 'currentPageSize.value', function() {
    let end = this.currentPage * this.currentPageSize.value;
    return end;
  }),

  totalPages: Ember.computed('currentPageSize.value', 'liveFilter', function() {
    return Math.ceil(this.get('liveFilter').length / this.currentPageSize.value);
  }),

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
    sortBy: function(property) {
      if (this.sortProperty === property) {
        this.sortData();
      } else {
        this.set('sortProperty', property);
      }
    },
    checkAll: function() {
      this.set('selectedDirectorates', this.get('directorates').slice(0));
    },
    uncheckAll: function() {
      this.set('selectedDirectorates', []);
    }/*,
    changePageSize: function(pageSize) {
      debugger;
    }*/
  }
});
