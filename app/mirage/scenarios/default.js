export default function( server ) {

  server.createList('proposal', 5);
  server.createList('coversheet', 5);
  server.createList('projectdescription', 5);

  server.createList('fundingopportunity', 5);

  server.loadFixtures('directorates');

  // Seed your development database using your factories. This
  // data will not be loaded in your tests.

  // server.createList('contact', 10);
}
