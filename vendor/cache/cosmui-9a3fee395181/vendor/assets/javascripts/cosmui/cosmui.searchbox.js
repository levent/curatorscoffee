/* -------------------------------------------
 *
 * cosmUI Search Box v0.0.1
 *
 * Copyright 2012 Cosm, Inc
 * Licensed under the Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * ------------------------------------------- */

// ----------------------------------- 
// Namespace check

if (window.cosmUI) { 

// ----------------------------------- 
//
// Definition
//
 
cosmUI.searchbox = (function( $ ){
  "use strict"
  
  // ----------------------------------- 
  // Private
  
  var globalSelector = '[data-cosmui*="searchbox"]',
  
      show = function ( e ) {
        var $this = $(this),
            position = $this.parent().position();
            
        e.preventDefault();
      
        // clear all popups first
        cosmUI.queue.trigger('clearPopups');
        
        if (cosmUI.screenSize() <= 880) { return true; }
        
        $this.parents().css( 'z-index', 9999 );
     		$this.parent().css({ position: 'absolute', top : position.top , left : position.left }).addClass('opened');
     		
        return false;      
      },
      
      close = function ( e ) {
        if (cosmUI.screenSize() <= 880) { return true; }
        $('[data-cosmui="searchbox"]').filter('.opened').removeClass('opened').parents().css( 'z-index', '' );
        if (e && e.keyCode == 27) { $('[data-cosmui="searchbox"]').find('.search-query').blur(); }
      },
      
      init = function ( e ) {
  
        $(globalSelector).find('.search-query').on('focus.cosmui.searchbox', show );
        $('html').on('click.cosmui.searchbox', function(e) { 
          if (!$(e.target).closest('.search').length ) {
            close();
          }
        } );  
        cosmUI.queue.clearPopups.push(close);
        
        return false;
  
      };

  // ----------------------------------- 
  // Init
  
  init();
	
  // ----------------------------------- 
  // Public
	return {
	
    show : show,
    close : close,
    reload : init
    
	};

})( window.jQuery );

} else {
  console.log('[ERROR] Unable to add plugin -- make sure the cosmUI core (cosmui.js) is loaded before this script');
}