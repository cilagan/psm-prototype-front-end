export default function() {

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */
  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = 'propmgt';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing



  this.get('docService/proposals', function(db) {
    return {
      proposals: db.proposals
    };
  });

  // this.get('/proposals/:proposal_id', function(db, request) {
  this.get('docService/proposal/:proposal_id/metadata', function(db, request) {
    let proposalId = +request.params.proposal_id;
    return {
      proposal: db.proposals.find(proposalId)
    };
  });

  this.del('docService/delete/proposal/:proposal_id');

  /*Project Description*/
  this.get('docService/proposal/:proposal_id/projdesc/metadata', function(db, request) {
    let proposal_Id = +request.params.proposal_id;
    return {
      'project-description': db.projectdescriptions.where({tempPropId: proposal_Id})
    };
  });

  /*Data Management Plan*/
  this.get('docService/proposal/:proposal_id/dmp/metadata', function(db, request) {
    let proposal_Id = +request.params.proposal_id;
    return {
      'data-management-plan': db.dmps.where({tempPropId: proposal_Id})
    };
  });


  /*Cover Sheet*/

  this.get('docService/proposal/:proposal_id/cover-sheet', function(db, request) {
    let proposal_Id = +request.params.proposal_id;
    return {
      'cover-sheet': db.coversheets.where({tempPropId: proposal_Id})
    };
  });

  this.post('docService/proposal/:proposal_id/cover-sheet', 'cover-sheet');

  this.del('docService/proposal/:proposal_id/cover-sheet', 'cover-sheet');


  /* WIZARD */

  this.get('propmgt/fundingops', function(db) {
    return {
      'wizard/funding-opportunity': db.fundingopportunities
    };
  });

  this.get('propmgt/directorates', function(db) {
    return {
      'wizard/directorate': db.directorates
    };
  });

  this.get('propmgt/divisions', function(db) {
      return {
        'wizard/division' : db.divisions
      };
  });

  this.get('propmgt/programs', function(db) {
      return {
        'wizard/program' : db.programs
      };
  });

//retrieve division and associated program
//TODO need to pull more than one program record, query based on div id
this.get('propmgt/division/:division_id', function(db, request) {
  var division_Id = +request.params.division_id;
  return {
    'wizard/division': db.divisions.find(division_Id),
    'wizard/program': db.programs.find(division_Id)
  };
});

this.get('propmgt/programs/:program_id', function(db, request) {
    var program_Id = request.params.program_id;
    return {
      'wizard/program' : db.programs.find(program_Id)
    };
});




this.passthrough('http://localhost/docService/proposal/1008698/projdesc');





  /*
    Route shorthand cheatsheet
  */
  /*
    GET shorthands

    // Collections
    this.get('/contacts');
    this.get('/contacts', 'users');
    this.get('/contacts', ['contacts', 'addresses']);

    // Single objects
    this.get('/contacts/:id');
    this.get('/contacts/:id', 'user');
    this.get('/contacts/:id', ['contact', 'addresses']);
  */

  /*
    POST shorthands

    this.post('/contacts');
    this.post('/contacts', 'user'); // specify the type of resource to be created
  */

  /*
    PUT shorthands

    this.put('/contacts/:id');
    this.put('/contacts/:id', 'user'); // specify the type of resource to be updated
  */

  /*
    DELETE shorthands

    this.del('/contacts/:id');
    this.del('/contacts/:id', 'user'); // specify the type of resource to be deleted

    // Single object + related resources. Make sure parent resource is first.
    this.del('/contacts/:id', ['contact', 'addresses']);
  */

  /*
    Function fallback. Manipulate data in the db via

      - db.{collection}
      - db.{collection}.find(id)
      - db.{collection}.where(query)
      - db.{collection}.update(target, attrs)
      - db.{collection}.remove(target)

    // Example: return a single object with related models
    this.get('/contacts/:id', function(db, request) {
      var contactId = +request.params.id;

      return {
        contact: db.contacts.find(contactId),
        addresses: db.addresses.where({contact_id: contactId})
      };
    });

  */
}

/*
You can optionally export a config that is only loaded during tests
export function testConfig() {

}
*/
