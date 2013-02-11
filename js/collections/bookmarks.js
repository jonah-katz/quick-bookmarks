define([
  'jquery',
  'underscore',
  'backbone',
  'models/bookmark'
], function($, _, Backbone,BookmarkModel){
  var bookmarkCollection = Backbone.Collection.extend({
    
    model:BookmarkModel,
    initialize: function (options) {
            _.bindAll(this,'callback','addToCollection');
            //initially, set the done boolean to false to signify we are not done retrieving the bookmarks 
            this.done = false;
            this.bookmarkTreeNodes = chrome.bookmarks.getTree(this.callback);
          
    },
    
    reload: function() {
            this.done = false;
            this.bookmarkTreeNodes = chrome.bookmarks.getTree(this.callback);
    },
    
    callback: function(tree) {
        this.addToCollection(tree);
    },
    
    addToCollection: function(tree) {
        //create a variable for this to use when this is redefined
        self = this;
        
        //empty array of loose_items, this array will be the children of a folder titled 'loose'. All non foldered bookmarks go in here
        var loose_items =[];
        
        //takes each bookmark branch 
        $.each(tree[0].children[0].children, function(e,f) {
            
            
            //if its not a folder, we will add it the folder 'loose'
            if(self.isItAFolder(f)) {
                self.add([
                    {id: f.id,
                    title: f.title,
                    url:f.url,
                    children:f.children}
                ])
            } else {
                //gets the loose folder and adds the current bookmark
                var item = {
                    id: f.id,
                    title: f.title,
                    url:f.url,
                    children:f.children
                };
                loose_items[loose_items.length] = item;
            }
        })
        
        self.done = true;
        //add the loose folder
          self.add([
            {id: '564',
            title: 'Loose',
            url:undefined,
            children:loose_items}
        ], {at: 0});
        

        
    },
    
   isItAFolder: function(mark) {
        if(mark.url == undefined) {
            return true;
        } else {
            return false;
        }
    }


  });

  return bookmarkCollection;
});