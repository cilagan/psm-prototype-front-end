/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */


 CKEDITOR.editorConfig = function( config ) {

   config.toolbarCanCollapse = true;
   config.mathJaxLib = '//cdn.mathjax.org/mathjax/2.2-latest/MathJax.js?config=TeX-AMS_HTML';

   config.toolbarGroups = [
 		{ name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
 		{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
 		{ name: 'forms', groups: [ 'forms' ] },
 		{ name: 'styles', groups: [ 'styles' ] },
 		'/',
 		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
 		{ name: 'colors', groups: [ 'colors' ] },
 		{ name: 'insert', groups: [ 'insert' ] },
 		{ name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
 		{ name: 'links', groups: [ 'links' ] },
 		{ name: 'tools', groups: [ 'tools' ] },
 		{ name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
 		{ name: 'others', groups: [ 'others' ] },
 		{ name: 'about', groups: [ 'about' ] }
   ];

 	config.removeButtons = 'Superscript,Subscript,Strike,Print,Preview,NewPage,Templates,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,CreateDiv,Language,Flash,PageBreak,Iframe';

 };
