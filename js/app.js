define([
  'jquery', 
   'underscore',
  'backbone',
  'views/bookmarks'
], function($,Underscore,Backbone,BookmarkView){
     var initialize = function(){
         
         //Pass control to bookmarkView, main app logic begins now
         var bookmarkView = new BookmarkView();
      }
    return { 
      initialize: initialize
    };
});


