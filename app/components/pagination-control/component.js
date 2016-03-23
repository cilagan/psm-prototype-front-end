import Ember from 'ember';

export default Ember.Component.extend({

  maxLinks: 5,

  canStepForward: Ember.computed('this.currentPage', 'this.totalPages', function() {
    return this.currentPage < this.totalPages;
  }),
  canStepBackward: Ember.computed('this.currentPage', function() {
    return this.currentPage > 1;
  }),

  links: Ember.computed('this.currentPage', 'this.totalPages', function() {
    let totalPages = this.totalPages;
    if (totalPages <= 1) { return [];}
    let currentPage = this.currentPage;
    let spread = this.maxLinks-1;
    let halfDistance = spread/2;

    let firstLink = (currentPage - halfDistance < 1) ? 1 : currentPage - halfDistance ;

    let lastLink = firstLink + spread;

    lastLink = (lastLink > totalPages) ? totalPages : lastLink;

    while ( firstLink > 1 && (lastLink - firstLink !== spread) ) { //firstLink must not go below 1
      firstLink--;
    }

    let links = [];

    for (let i = firstLink; i <= lastLink; i++) {
      links.push(i);
    }
    return links;
  }),

  pageSizes: [
    {value: 10, label: "show 10"},
    {value: 50, label: "show 50"},
    {value: 100, label: "show 100"},
    {value: 262144, label: "show all"}
  ],

  actions: {
    changePageSize: function(pageSize) {
      pageSize = parseInt(pageSize);
      this.sendAction('changePageSize', pageSize);
    },
    stepForward: function() {
      this.incrementProperty('currentPage');
    },
    stepBackward: function() {
      this.decrementProperty('currentPage');
    },
    goToPage: function(page) {
      this.set('currentPage', page);
    },
    firstPage: function() {
      this.set('currentPage', 1);
    },
    lastPage: function() {
      this.set('currentPage', 'totalPages');
    }
  }

});
