import { test } from 'qunit';
import moduleForAcceptance from 'psm-prototype-front-end/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | projsumm');

test('visiting project summary page', function(assert) {
  server.createList('proposal', 1);
  visit('/proposal/1/project-summary');

  andThen(function() {
    assert.equal(currentPath(), 'proposal.project-summary', 'correct route');
    assert.equal(find('h1').text(), 'Project Summary', 'correct page title displayed');
    assert.equal(find('textarea').length, 3, 'three textareas displayed');
  });

  click('button:contains(\'Save\')');

  andThen(function() {
      assert.equal(find('div.alert-warning').text().trim(), '×\n    Required fields are required.', 'save warning message displays');
      // assert.equal(find('textarea[name="overview"]:eq(0)').attr('id'), 'ember432', 'ember ids match');
  });

  // debugger;
  //
  // let overviewEmberId = find('textarea[name="overview"]').attr('id');
  // let intellectualMeritEmberId = $('textarea[name="intellectualMerit"]:eq(0)').attr('id');
  // let broaderImpactsEmberId = $('textarea[name="broaderImpacts"]:eq(0)').attr('id');
  //
  // debugger;
  // // fillIn(CKEDITOR.instances[overviewEmberId], 'something');
  // CKEDITOR.instances[overviewEmberId].setData("overview");
  //
  // click('button:contains(\'Save\')');
  //
  // andThen(function() {
  //     assert.equal(find('div.alert-warning').text().trim(), '×\n    Required fields are required.', 'save warning message displays');
  // });

});
