//Starting point

require.config({
  paths: {
    jquery: 'libs/jquery-1.9.0',
    underscore: 'libs/underscore',
    backbone: 'libs/backbone'
  },

  
  shim: {
    backbone: {
        deps: ['jquery','underscore'],
        exports: 'Backbone'
    },
    underscore: {
            'exports': '_'
    }

}

  
});


//Pass control to app.js
require([
  'jquery',
  'underscore',
  'app',
], function($,_,App){
    App.initialize();
});

