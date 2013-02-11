
define([
  'jquery',
  'underscore',
  'backbone',
  'collections/bookmarks',
], function($,Underscore,Backbone,BookmarkCollection){
  var bookmarkView = Backbone.View.extend({
    el: '#bookmarks',
    initialize: function () {
        
        //bindAll so that on a click event, the original value of this is retained
            _.bindAll(this,'folderClick','bookmarkClick');
        this.bookmarkCollection = new BookmarkCollection();
        this.bookmarkCollection.on('add', this.displayBookmarks,this);

    },
    
    events : {
        'click .bookmark-folder':'folderClick',
        'click .bookmark-item':'bookmarkClick'
    },
    
    displayBookmarks: function() {
        //done is a boolean that signifies if the colleciton is done gathering the bookmarks
        if(this.bookmarkCollection.done) {
            //clear the list so we can start fresh
            $('#bookmark-folders-list').children().remove();

            //all the models bookmarks and folders
            var models = this.bookmarkCollection.models;


            //variables outside of the for loop
            var title,mark, target, template;
            
            
            for(var i =0;i<this.bookmarkCollection.length;i++) {

                //place the attributes in a variable for simplicity
                mark = models[i].attributes;
                title = mark.title;


                template = "<li class='bookmark-folder' id='"+mark.id+"'>"+title.replace("http://", "").substr(0,20)+"</li>";
                target = $('#bookmark-folders-list');
                
                //append the template, customized for the current bookmark, to the target
                target.append(template);


            } 

            //display the initial folder, titled loose (id 564)
            this.setActiveFolder(564);
        }
    },
    
    //simply function that determines if a bookmark is a folder
    isItAFolder: function(mark) {
        if(mark.url == undefined) {
            return true;
        } else {
            return false;
        }
    }, 
    
    //called when a folder is clicked
    folderClick: function(fold) {
        //checking if its a spam is useful if you were to put a clickable span element within the folder (li) element
        if(fold.target.nodeName != 'SPAN') {
            //make the clicked folder the active folder
            this.setActiveFolder(fold.target.id);
        }
    },
    
    setActiveFolder: function(folder_id) {
        //remove the current active folder's bookmakrds
        $('#bookmarks-list').children().remove();
        
        //get the folder using the passed folder id
        var folder = this.bookmarkCollection.get(folder_id);
        
        
        $.each(folder.attributes.children, function(e,f) {
            template = "<li class='bookmark-item' data-url='"+f.url+"'><img class='icon' src='chrome://favicon/"+f.url+"'/>"+f.url.replace("http://", "").substr(0,40)+"</li>";
            target = $('#bookmarks-list');
            target.append(template);
        })
    },
    
    //function called when a bookmark is clicked
    bookmarkClick: function(book) {
        //get the url the clicked bookmark references; data-url
        this.openUrl(book.target.getAttribute('data-url'));
    },
     
     //function to open a passed url
    openUrl: function(url) {
        chrome.tabs.create({url: url});
    }
    
    
    //Some point in the future, bookmarks will be able to be added via this extension, but not today 
//    addCurrentPageClick: function(add) {
//        self = this;
//        var current_url;
//        chrome.tabs.query({'active':true}, function(tabs) {console.log(tabs[0]) });
//        chrome.bookmarks.create({
//            parentId: $(add.target).parent().attr('id'),
//            url: current_url
//        }, function() {
//            self.bookmarkCollection.reload();
//        })
//    }

    

  });
  return bookmarkView;
});

