/* -------------------------------------------
 *
 * cosmUI Tabs v0.0.1
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
 
cosmUI.tabs = (function( $ ){
  "use strict"
  
  // ----------------------------------- 
  // Private
  
  var globalSelector = '[data-cosmui*="tab"]',
      
      // show ( target-tab )
  
      show = function ( el ) {    
        var $this = $(this),
            $target = $( cosmUI.getTarget( $this ) ),
            isActive,
            $li;
        
        if (el && $(el)[0].tagName ) {
          $target = $(el);
          $this = $('[data-target="#'+ $target.attr('id') +'"]');
          if (!$this.length) $this = $('[href="#'+ $target.attr('id') +'"]');
        }
    
        isActive = $target.hasClass('active');
        
        if (!isActive && $this.length && $target.length) {
          $li = $this.parent();
          $target.siblings('.active').removeClass('active');
          $target.addClass('active');
          $li.siblings('.active').removeClass('active');
          $li.addClass('active');
        }
        
        return false;
        
      },
      
      init = function ( e ) {

        $(globalSelector).on('click.cosmui.tabs', show);
        
        return false;        
        
      };

  // ----------------------------------- 
  // Init
  
  init();
	
  // ----------------------------------- 
  // Public
	return {
	
    show : show,
    reload: init
    
	};

})( window.jQuery );

} else {
  console.log('[ERROR] Unable to add plugin -- make sure the cosmUI core (cosmui.js) is loaded before this script');
}