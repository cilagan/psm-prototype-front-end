export default function( server ) {

  server.createList('proposal', 5);
  server.createList('coversheet', 5);
  server.createList('projectdescription', 5);
  server.createList('dmp', 5);

  server.createList('fundingopportunity', 1000);

  server.loadFixtures('directorates');

  server.createList('division', 1000);
  server.createList('program', 1000);

  // server.loadFixtures('divisions');
  // server.loadFixtures('programs');
  // Seed your development database using your factories. This
  // data will not be loaded in your tests.

  // server.createList('contact', 10);
}
