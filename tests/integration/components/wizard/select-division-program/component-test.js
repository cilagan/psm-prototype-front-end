import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('wizard/select-divsion-program', 'Integration | Component | wizard/select divsion program', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{wizard/select-divsion-program}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#wizard/select-divsion-program}}
      template block text
    {{/wizard/select-divsion-program}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
