import { test } from 'qunit';
import moduleForAcceptance from 'psm-prototype-front-end/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | wizard division program');

test('visiting /wizard-division-program', function(assert) {
  server.createList('fundingopportunity', 10);
  visit('/create');

  fillIn('td input:radio:first', 'checked');
  andThen(function() {
    click('button:contains(\'Next\')');
  });

  andThen(function() {
    assert.equal(find('h2').text(), 'Select Divisions and Programs', 'correct page title displayed');
  });
});
