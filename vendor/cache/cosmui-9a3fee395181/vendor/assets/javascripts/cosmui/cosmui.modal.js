/* -------------------------------------------
 *
 * cosmUI Modal v0.0.1
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
   
  cosmUI.modal = (function( $ ){
    "use strict"
    
    // ----------------------------------- 
    // Private
    
    var globalSelector = '[data-cosmui*="modal"]',
    
        close = function ( el ) {        
          var $target = (!el || el instanceof jQuery.Event) ? $('.modal') : $(el),
              $backdrop = $('.modal-backdrop'),
              isActive;

          if (el && el instanceof jQuery.Event) {
            el.preventDefault();
          }  
           
          // if data-confirm then confirm close 
          if ($target.attr('data-confirm') && $target.attr('data-confirm') != '' && $('.form-steps-header').length && !confirm($target.attr('data-confirm')) ) {
            return false;
          }
          
          isActive = $target.hasClass('open');
          
          if ( $target && isActive ) {
            // un-assign global events
            $target.find('.close').off('click');
            $target.find('[data-close="modal"]').off('click');
            $('html').off('keyup.cosmui.modal');
            $('html').off('click.cosmui.modal');
            
            // set callback for animation end
            if ( cosmUI.settings.animation.enabled && cosmUI.transitions.enabled() ) {
              $target.one(cosmUI.transitions.getTransitionEnd(), function() {
                $target.parent().trigger('cosmui.modal.close-after');
                $target
                  .css('display','none')
                  .parents().css({ 'z-index' : '', 'position' : '' });
              });
              $backdrop.one(cosmUI.transitions.getTransitionEnd(), function() {
                $backdrop.remove();
                $backdrop = null;
              });
            }
            
            $backdrop.removeClass('open');
            $target
              .trigger('cosmui.modal.close')
              .trigger('cosmui.modal.close-before')
              .removeClass('open');
              
            if ( !cosmUI.settings.animation.enabled || !cosmUI.transitions.enabled() ) {
              $target.hide().trigger('cosmui.modal.close-after').parents().css({ 'z-index' : '', 'position' : '' });
              $backdrop.remove();
              $backdrop = null;
            }
          }
        },
    
        open = function ( el ) {
          var $this = $(this),
              $target = (!el || el instanceof jQuery.Event) ? cosmUI.getTarget( $this ) : $(el),
              isActive;

          if (el instanceof jQuery.Event) {
            el.preventDefault();
          }
      
          isActive = $target.hasClass('open');
        
          // clear all popups first
          cosmUI.queue.trigger('clearPopups');
          
          if ( !isActive && $target.length && $target.hasClass('modal') ) {    
            // assign global events
            $target.find('.close').on('click.cosmui.modal', function() { close() });
            $target.find('[data-close="modal"]').on('click.cosmui.modal', function() { close(); return false; });
            $('html').on('keyup.cosmui.modal', function(e) { if (e.keyCode == 27) { close() } });
          
            // set callback for animation end
            if ( cosmUI.settings.animation.enabled && cosmUI.transitions.enabled() ) {
              $target.on(cosmUI.transitions.getTransitionEnd(), '*', function(e) {
                e.stopPropagation();
              });
              $target.one(cosmUI.transitions.getTransitionEnd(), function() {
                $target.trigger('cosmui.modal.open-after');
              });
            }
                  
            // show backdrop
            $('<div class="modal-backdrop" style="display:none;" />')
              .insertAfter($target)
              .on('click.cosmui.modal', function() { return false; })
              .show()
              .addClass('open');
          
            // show modal
            $target
              .trigger('cosmui.modal.open')
              .trigger('cosmui.modal.open-before')
              .show()
              .addClass('open')
              .parents().css({ 'z-index' : 9999, 'position' : 'relative' });

            if ( !cosmUI.settings.animation.enabled || !cosmUI.transitions.enabled() ) {
              $target.trigger('cosmui.modal.open-after');
            }
            
            if (cosmUI.screenSize() <= 755) {
              $("html, body").animate({
          			scrollTop: '36px'
          		}, {
          			duration: cosmUI.settings.animation.slow,
          			easing: "swing"
          		});              
            }
          }
        },
        
        init = function ( e ) {
        
          $(globalSelector).on('click.cosmui.modal', open);
          $('.modal').not('.open').css('display','none'); 
          
          // initialize through hash
          if ( location.hash && location.hash != '' && location.hash != '#!' && $(location.hash).hasClass('modal') ) {
            open($(location.hash));
            location.hash = '!';
          }
          
          return false;
        
        };
  
    // ----------------------------------- 
    // Init
    
    init();
  	
    // ----------------------------------- 
    // Public
  	return {
  	
      close  : close,
      open   : open,
      reload : init
      
  	};
  
  })( window.jQuery );

} else {
  console.log('[ERROR] Unable to add plugin -- make sure the cosmUI core (cosmui.js) is loaded before this script');
}
