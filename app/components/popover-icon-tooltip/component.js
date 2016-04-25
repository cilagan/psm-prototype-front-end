import Ember from 'ember';

const PopoverIconTooltipComponent = Ember.Component.extend({

  header: Ember.computed('params.[]', function() {
    return this.get('params')[0];
  }),
  content: Ember.computed('params.[]', function() {
    return this.get('params')[1];
  }),
  position: Ember.computed('params.[]', function() {
    return this.get('params')[2] ? this.get('params')[2] : "right" ;
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
})

export default PopoverIconTooltipComponent;
