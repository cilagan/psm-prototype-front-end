import { test } from 'qunit';
import moduleForAcceptance from 'psm-prototype-front-end/tests/helpers/module-for-acceptance';

let fundingOpSize = 100;
moduleForAcceptance('Acceptance | wizard funding op', {
  beforeEach: function() {
    visit('/create');
    server.loadFixtures('fundingopportunities');
    // server.createList('fundingopportunity', fundingOpSize);
  }
});

test('visiting Select Funding Opportunity wizard screen', function(assert) {

  andThen(function() {
    assert.equal(currentPath(), 'wizard', 'correct route');
    assert.equal(currentURL(), '/create', 'correct url');
    // assert.equal(find('h2').text(), 'Select Funding Opportunity', 'correct page title displayed');
  });
});

test ('check selectable funding opportunities are present and page size changes', function(assert) {
  // let fundingOpSize = 100;
  let notCountedTRs = 2; //header tr, search tr

  // server.createList('fundingopportunity', fundingOpSize);
  // visit('/create');

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

test ('sort the funding opportunities', function(assert) {

  let pageSize = find('.test-page-size-select').val();

  andThen(function() {
    let titlesFromPage = [];
    find('td:nth-child(3)').each(function(){
        titlesFromPage.push($(this).text().trim());
    });

    let testFOs = $.getJSON('propmgt/fundingops').then(function(json){
      let titlesFromDB = json.map(function(j){
          return j.title;
      });
      assert.deepEqual( titlesFromPage.slice(1, pageSize+1), titlesFromDB, 'The funding opportunities are sorted correctly.');
    });
  });

  click('.sortable-header:contains(\'Solicitation Number\')');
  click('.sortable-header:contains(\'Solicitation Number\')'); //click twice to reverse the order

  andThen(function() {
    let idsFromPage = [];
    find('td:nth-child(2)').each(function(){
        idsFromPage.push($(this).text().trim());
    });

    let testFOs = $.getJSON('propmgt/fundingops').then(function(json){
      let idsFromDB = json.map(function(j){
          return j.id;
      });
      assert.deepEqual( idsFromPage.slice(1, pageSize+1), idsFromDB.reverse(), 'The funding opportunities are sorted in descending order by Solicitation Number correctly.');
    });
  });

  click('.sortable-header:contains(\'Program Announcement\')');

  andThen(function() {
    let titlesFromPage = [];
    find('td:nth-child(3)').each(function(){
        titlesFromPage.push($(this).text().trim());
    });

    let testFOs = $.getJSON('propmgt/fundingops').then(function(json){
      let titlesFromDB = json.map(function(j){
          return j.title;
      });

      assert.deepEqual( titlesFromPage.slice(1, pageSize+1), titlesFromDB.sort(), 'The funding opportunities are sorted in ascending order by Program Announcement correctly.');
    });
  });

});

test ('cannot move forward without selecting a funding opportunity', function(assert){

  click('button:contains(\'Next\')');

  andThen(function() {
    // assert.equal(find('h2').text(), 'Select Funding Opportunity', 'still on funding opportunity page');
    assert.equal(find('div.alert-warning').text().trim(), 'Pick a funding opportunity.', 'warning message displays');
  });

});
