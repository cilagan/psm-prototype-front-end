/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
    sassOptions: {
      includePaths: [
          'bower_components/bootstrap-sass/assets/stylesheets'
        ],
      extension: 'scss'
    }
  });

  /*Scripts*/
  app.import('bower_components/jquery/dist/jquery.min.js');
  app.import('bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js');

  /*Bootstrap Fonts*/
  // app.import('bower_components/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.eot', {
  //   destDir: 'fonts/bootstrap'
  // });
  // app.import('bower_components/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.svg', {
  //   destDir: 'fonts/bootstrap'
  // });
  // app.import('bower_components/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.ttf', {
  //   destDir: 'fonts/bootstrap'
  // });
  // app.import('bower_components/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.woff', {
  //   destDir: 'fonts/bootstrap'
  // });
  // app.import('bower_components/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.woff2', {
  //   destDir: 'fonts/bootstrap'
  // });

  /*Font Awesome*/
  app.import('bower_components/font-awesome/css/font-awesome.css');
  app.import('bower_components/font-awesome/fonts/fontawesome-webfont.eot', {
    destDir: 'fonts'
  });
  app.import('bower_components/font-awesome/fonts/fontawesome-webfont.svg', {
    destDir: 'fonts'
  });
  app.import('bower_components/font-awesome/fonts/fontawesome-webfont.ttf', {
    destDir: 'fonts'
  });
  app.import('bower_components/font-awesome/fonts/fontawesome-webfont.woff', {
    destDir: 'fonts'
  });
  app.import('bower_components/font-awesome/fonts/fontawesome-webfont.woff2', {
    destDir: 'fonts'
  });
  app.import('bower_components/font-awesome/fonts/FontAwesome.otf', {
    destDir: 'fonts'
  });


  /*CKEditor*/
  app.import('vendor/ckeditor_setup.js'); //setup must be imported before ckeditor.js
  app.import('vendor/ckeditor.js');

  //Need bower packages bootstrap-fileinput

  //Script
  // app.import('bower_components/bootstrap/dist/js/bootstrap.min.js');
  // app.import('bower_components/bootstrap-fileinput/js/fileinput.min.js');

  //Style
  // app.import('bower_components/bootstrap-fileinput/css/fileinput.min.css');






  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
