import { test } from 'qunit';
import moduleForAcceptance from 'psm-prototype-front-end/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | wizard funding op');

test('visiting Select Funding Opportunity wizard screen', function(assert) {
  visit('/create');

  andThen(function() {
    assert.equal(currentPath(), 'wizard', 'correct route');
    assert.equal(currentURL(), '/create', 'correct url');
    assert.equal(find('h2').text(), 'Select Funding Opportunity', 'correct page title displayed');
  });
});

test ('check selectable funding opportunities are present and page size changes', function(assert) {
  let fundingOpSize = 100;
  let notCountedTRs = 2; //header tr, search tr

  server.createList('fundingopportunity', fundingOpSize);
  visit('/create');

  andThen(function() {
    assert.equal(find('tr').length, 10 + notCountedTRs, '10 funding opportunities shown');
  });

  fillIn('.test-page-size-select', 50);
  andThen(function() {
    assert.equal(find('tr').length, 50 + notCountedTRs, '50 funding opportunities shown');
  });

  fillIn('.test-page-size-select', 100);
  andThen(function() {
    assert.equal(find('tr').length, 100 + notCountedTRs, '100 funding opportunities shown');
  });

  fillIn('.test-page-size-select', 262144);
  andThen(function() {
    assert.equal(find('tr').length, fundingOpSize + notCountedTRs, 'All funding opportunities shown');
  });

});

test ('cannot move forward without selecting a funding opportunity', function(assert){
  let fundingOpSize = 100;

  server.createList('fundingopportunity', fundingOpSize);
  visit('/create');

  click('button:contains(\'Next\')');

  andThen(function() {
    assert.equal(find('h2').text(), 'Select Funding Opportunity', 'still on funding opportunity page');
    assert.equal(find('div.alert-warning').text().trim(), 'Pick a funding opportunity.', 'warning message displays');
  });

});
