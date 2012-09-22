/* -------------------------------------------
 *
 * cosmUI Adaptive v0.0.1
 *
 * Copyright 2012 Cosm, Inc
 * Licensed under the Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * ------------------------------------------- */

// ----------------------------------- 
// Namespace check

if (window.cosmUI) {  
  (function($,sr){
   
    // debouncing function from John Hann
    // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
    var debounce = function (func, threshold, execAsap) {
        var timeout;
   
        return function debounced () {
            var obj = this, args = arguments;
            function delayed () {
                if (!execAsap)
                    func.apply(obj, args);
                timeout = null; 
            };
   
            if (timeout)
                clearTimeout(timeout);
            else if (execAsap)
                func.apply(obj, args);
   
            timeout = setTimeout(delayed, threshold || 100); 
        };
    }
  	// smartresize 
  	jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };
   
  })(jQuery,'smartresize');

  // ----------------------------------- 
  //
  // Definition
  //
   
  cosmUI.adaptive = (function( $ ){
    "use strict"
    
    // ----------------------------------- 
    // Private
    
    var pixRatio = (function(){ 
          // get pixel ratio
          if(window.devicePixelRatio !== undefined) {
            return window.devicePixelRatio;
          }
          else {
            return 1;
          }
        })(),
        
        altNavigation = function(targetParent, opt_defaultText) {
        	var defaultText = opt_defaultText || "Go to...";
        	
        	// Create the dropdown base
          $("<select />", { 'class' : 'alt-navigation' }).insertAfter(targetParent +' > ul');
          
          // Create default option "Go to..."
          $("<option />", {
            "selected": "selected",
            "value"   : "",
            "text"    : defaultText
          }).appendTo(targetParent +' select');
          
          // Populate dropdown with menu items
          $(targetParent +' > ul > li > a').each(function() {
            var el = $(this);
            $("<option />", {
               "value"   : el.attr("href"),
               "text"    : el.text()
            }).appendTo(targetParent +' select');
          });
          
          // Make the select work
          $(targetParent +' select').change(function() {
            window.location = $(this).find("option:selected").val();
          });
        
        },
    
        // ----------------------------------- 
        // Initialization
        
        init = function ( e ) {
        	
        	// 520
        	if (cosmUI.screenSize() <= 520) {
          	$('.feed-summary-datastreams').scrollLeft(1000).find('.feed-datastream-table').each(function(index,el){
              
              var $table = $(el),
                  widthValue = $table.find('.feed-datastream-current-value').first().outerWidth(true),
                  widthGraph = $table.find('.feed-datastream-graph').first().outerWidth(true);
                  
              $table.find('.feed-datastream-id').css({ 'text-indent': widthGraph - (cosmUI.screenSize() - 50 - widthValue) + 'px' });
                      	
          	});
          	
          	$('.datastream-table-container').scrollLeft(1000);
          	
          	if ($('.feed-page-edit').length && !$('.feed-edit-helper-title').length) {
              $('<header/>', { 'class': 'feed-edit-helper-title', html: '<h2>Edit Feed</h2>' }).insertBefore('.feed-page-edit');
          	}
        	
            cosmUI.toggler.close($('.user-menu-links'));
            $('.user-menu-button').removeClass('active');
        	}
        	else {
            $('.feed-summary-datastreams').scrollLeft(0).find('.feed-datastream-id').css({ 'text-indent': 0 });
          	$('.datastream-table-container').scrollLeft(0);
        	}
        	
        	// login helper
        	if (cosmUI.screenSize() <= 615 && cosmUI.screenSize() > 520 && !$('.login-button').length) {
            $('<button/>', { 'class': 'login-button button no-margin', html: 'Login' })
              .on('click', function() {
                $(this).hide();
                $('.user-menu-login').toggle();
              })
              .insertAfter('.user-menu-login');
        	}

        	// sign up helper
        	if (cosmUI.screenSize() <= 615 && !$('.signup-button').length) {
            $('<a/>', { 'class': 'signup-button button button-secondary no-margin', html: 'Sign Up', 'href': '#signup', 'data-cosmui': 'toggler opener' })
              .on('click', function() {
                cosmUI.toggler.open( $( $(this).attr('href') ) );
              })
              .insertAfter('.user-menu-login');
        	}

          return false;
        
        };
        	
  	// create the alternative select menu
  	if ($('.main-header .navigation').length) {
      altNavigation('.main-header-content');
  	}
  	if ($('.box-navigation ul').length) {
      altNavigation('.box-navigation');
      $('<span/>', { 'class': 'box-navigation-helper', html: 'Support / API' }).prependTo('.box-navigation');
  	}
  	
  	// helper for z-indexes        	
  	$('.user-menu-links').on('cosmui.toggler.open', function(){
      var $this = $(this);
      if (cosmUI.screenSize() <= 615) {
        $this.parents().css('z-index',9999);
        $this.prev('a').addClass('expanded');
        $this.closest('.box').addClass('expanded');
      }
  	});
  	
  	$('.user-menu-links').on('cosmui.toggler.close-after', function(){
      var $this = $(this);
      if (cosmUI.screenSize() <= 615) {
        $this.parents().css('z-index','');
        $this.prev('a').removeClass('expanded');
        $this.closest('.box').removeClass('expanded');
      }
  	});
  	
  	// helper for search box
  	$('.main-header .search-query').on('focus', function(){
  	  if (cosmUI.screenSize() > 755) { return false; }
      var $this = $(this),
          $wrapper = $this.closest('.search'),
          $button = $wrapper.find('.button');
      $wrapper.css('left','-30px');
      $button.show();      
  	});
  	$('.main-header .search-query').on('blur', function(){
  	  if (cosmUI.screenSize() > 755) { return false; }
      var $this = $(this),
          $wrapper = $this.closest('.search'),
          $button = $wrapper.find('.button');
      $button.hide();
      $wrapper.css('left','');
  	});
  
    // call re-usabled init code
    init();
    
    // debounced reload on resize   
    $(window).smartresize(function(){  
      init();
    });
  	
    // ----------------------------------- 
    // Public
  	return {
  	
      reload   : init
      
  	};
  
  })( window.jQuery );

} else {
  console.log('[ERROR] Unable to add plugin -- make sure the cosmUI core (cosmui.js) is loaded before this script');
}