/* -------------------------------------------
 *
 * cosmUI Dropdown v0.0.1
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
   
  cosmUI.dropdown = (function( $ ){
    "use strict"
    
    // ----------------------------------- 
    // Private
    
    var globalSelector = '[data-cosmui*="dropdown"]',
        
        clearAll = function () {
          $('.dropdown-menu.open').removeClass('open').parents().css( 'z-index', '' );
          $('[data-cosmui="dropdown"]').removeClass('active');
          $('[data-cosmui="dropdown"]').parent('.actions').css('opacity','');
        },
    
        toggle = function ( e ) {        
          var $this = $(this),
              $target = cosmUI.getTarget( $this ),
              position,
              isActive;
      
          isActive = $target.hasClass('open');
        
          // clear all popups first
          cosmUI.queue.trigger('clearPopups');
          
          if ( !isActive ) {
            position = $this.position();
            position.top = parseInt(position.top,10) + parseInt($this.innerHeight(),10) + 'px';
            
            // figure out if we should align it to the right
            if ( $target.hasClass('aligned-right') || $this.parents('aside[role="complementary"]').length ) {
              //position.left = parseInt(position.left,10) + parseInt($this.css('margin-left'),10) - parseInt($target.outerWidth(),10) + (parseInt($this.outerWidth(),10) / 2) + 'px';
              position.left = parseInt(position.left,10) + parseInt($this.css('margin-left'),10) + parseInt($this.outerWidth(),10) - parseInt($target.outerWidth(),10);
              position.left += 'px';
              $target.addClass('aligned-right');
            } 
            else {
              position.left = parseInt(position.left,10) + parseInt($this.css('margin-left'),10) + 'px';
            }
            
            $this.parents().css( 'z-index', 90 );
            $this.parent('.actions').css('opacity',1);
            $target.css({ top : position.top , left : position.left }).addClass('open') && $this.addClass('active');
          }
      
          return false;
        },
        
        init = function ( e ) {
        
          $(globalSelector).on('click.cosmui.dropdown', toggle);
          $('html').on('click.cosmui.dropdown', function(e) { 
            if (!$(e.target).closest('.dropdown-menu').length ) {
              clearAll();
            }
          });
          cosmUI.queue.clearPopups.push(clearAll);
          
          return false;
        
        };
  
    // ----------------------------------- 
    // Init
    
    init();
  	
    // ----------------------------------- 
    // Public
  	return {
  	
      clearAll : clearAll,
      reload : init
      
  	};
  
  })( window.jQuery );

} else {
  console.log('[ERROR] Unable to add plugin -- make sure the cosmUI core (cosmui.js) is loaded before this script');
}