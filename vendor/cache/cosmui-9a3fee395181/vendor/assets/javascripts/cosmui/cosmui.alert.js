/* -------------------------------------------
 *
 * cosmUI Alert v0.0.1
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
   
  cosmUI.alert = (function( $ ){
    "use strict"
    
    // ----------------------------------- 
    // Private
    
    var globalSelector = '[data-cosmui*="alert"]',
    
        close = function ( e ) {
        
          var $this = $(this),
              $alert = $this.parent('.alert');
              
          if ( e && $(e).length && $(e)[0].tagName && $(e).hasClass('alert') ) {
            $alert = $(e);
          }
          
          if ( $alert.length ) {
            if ( cosmUI.settings.animation.enabled && cosmUI.transitions.enabled() ) {
              $alert.on(cosmUI.transitions.getTransitionEnd(), function() {
                $alert.remove();
              });
              $alert.addClass('closed');
            }
            else if ( cosmUI.settings.animation.enabled ) {          
              $alert.slideUp(cosmUI.settings.animation.fast, function() {
                $alert.remove();
              });
            }
            else {
              $alert.remove();
            }
          }
          
          return false;
                    
        },
        
        init = function ( e ) {
        
          $(globalSelector).find('.close').on('click.cosmui.alert', close);
          
          return false;
        
        };
  
    // ----------------------------------- 
    // Init
    
    init();
  	
    // ----------------------------------- 
    // Public
  	return {
  	
      close : close,
      reload : init
      
  	};
  
  })( window.jQuery );

} else {
  console.log('[ERROR] Unable to add plugin -- make sure the cosmUI core (cosmui.js) is loaded before this script');
}