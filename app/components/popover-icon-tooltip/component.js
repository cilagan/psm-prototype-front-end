import Ember from 'ember';
// import $ from 'jquery'; //do not import jQuery to avoid Bootstrap jQuery conflicts

const PopoverIconTooltipComponent = Ember.Component.extend({

  tagName: 'a',
  attributeBindings: ['href', 'title', 'dataToggle:data-toggle', 'dataTrigger:data-trigger', 'dataContent:data-content', 'dataPlacement:data-placement'],
  href: '#',
  dataToggle: 'popover',
  dataTrigger: 'hover',

  title: Ember.computed('params.[]', function() {
    return this.get('params')[0];
  }),
  dataContent: Ember.computed('params.[]', function() {
    return Ember.String.htmlSafe(this.get('params')[1]);
  }),
  dataPlacement: Ember.computed('params.[]', function() {
    //return this.get('params')[2] ? this.get('params')[2] : "right" ;
    return this.get('params')[2] || "right" ;
  }),

  didInsertElement: function() {
    $('[data-toggle="popover"]').popover();
  },
  willDestroyElement: function() {
    $('[data-toggle="popover"]').popover('destroy');
  }

});

PopoverIconTooltipComponent.reopenClass({
  positionalParams: 'params'
});

export default PopoverIconTooltipComponent;
