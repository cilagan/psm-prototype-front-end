import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('wizard/select-funding-op', 'Integration | Component | wizard/select funding op', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{wizard/select-funding-op}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#wizard/select-funding-op}}
      template block text
    {{/wizard/select-funding-op}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
