/* -------------------------------------------
 *
 * cosmUI Toggler v0.0.1
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
   
  cosmUI.toggler = (function( $ ){
    "use strict"
    
    // ----------------------------------- 
    // Private
    
    var globalSelector = '[data-cosmui*="toggler"]',
    
        // NOTICE :: This plugin doesn't use CSS3 transitions because they can't perfectly perform the job since :before and :after are not supported yet.
        
        inputType = function ($this) {
            
          // if it's a radio or checkbox return true
          if ( $this[0] && 
               $this[0].tagName && 
               $this[0].tagName.toLowerCase() == 'input' && 
             ( $this.attr('type') == 'radio' || 
               $this.attr('type') == 'checkbox') ) 
          {
            return true;
          }
          else {
            return false;
          }
          
        },
        
        open = function ( el, animType ) {
          
          var $this = $(el),
              anim = animType ? cosmUI.settings.animation.types[animType][0] : 'slideDown';
          
          if ( $this.length && $this.hasClass('closed') ) {
            
            $this.each(function(){
              $(this)
                .trigger('cosmui.toggler.open')
                .trigger('cosmui.toggler.open-before')
                [anim](cosmUI.settings.animation.fast, function() {
                  $(this)
                    .removeClass('closed')
                    .trigger('cosmui.toggler.open-after');
              });  
            });         
          }       
          else {
            cosmUI.error('(cosmUI.toggler.open) No target to open.');
            return false;
          }          
          
          return false;
          
        },
        
        close = function ( el, animType ) {

          var $this = $(el),
              anim = animType ? cosmUI.settings.animation.types[animType][1] : 'slideUp';
            
          if ( $this.length && !$this.hasClass('closed') ) { 
            
            $this.each(function(){
              $(this)
                .trigger('cosmui.toggler.close')
                .trigger('cosmui.toggler.close-before')
                [anim](cosmUI.settings.animation.fast, function() {
                  $(this)
                    .addClass('closed')
                    .trigger('cosmui.toggler.close-after');
              });     
            });
          }       
          else {
            cosmUI.error('(cosmUI.toggler.close) No target to close.');
            return false;
          }          
          
          return false;
        
        },
    
        toggle = function ( e ) {
        
          var $this = $(this),
              $target = (!e || e instanceof jQuery.Event) ? cosmUI.getTarget( $this ) : $(e),
              animType = 'slide',
              $parent = $($this.attr('data-parent')),
              $children = $($parent.attr('data-children'));

          if (e && e instanceof jQuery.Event) {
            e.preventDefault();
          } 
                    
          if ( $target.length ) {
            if ( $this.attr('data-animation') && cosmUI.settings.animation.types[$this.attr('data-animation')]) {
              animType = $this.attr('data-animation');
            }
            
            // close all others below data-parent
            if ($parent.length) {
              if (!$children.length) {
                $children = $parent.find('.accordion-content');
              }
              
              if ($children.length) {
                $children.filter(':visible').each(function(){
                  close($(this),animType);
                });
              }
            }
          
            // loop targets to animate each       
            $target.each(function(){
              var cosmUIattr = $this.attr('data-cosmui') || '';
              
              // return if always open and not closed
              if ( $(this).hasClass('always-open') && !$(this).hasClass('closed') ) {
                return false;                
              }
              // open if closed and not a closer
              else if ( $(this).hasClass('closed') && cosmUIattr.indexOf('closer') == -1 ) {
                open($(this),animType); 
                $this.toggleClass('active');
              }
              // close if not a opener
              else if ( cosmUIattr.indexOf('opener') == -1 ) {
                close($(this),animType);
                $this.toggleClass('active');
              }
              
            });
            
            // if it's a radio or checkbox return true
            return inputType($this);
          }          
          else {
            cosmUI.error('(cosmUI.toggler.toggle) No target to toggle.');
            return false;
          }
                    
        },
        
        init = function ( e ) {
          var $this;
        
          $(globalSelector).each(function(){
            $this = $(this);
            
            // if it's a radio or checkbox, handle onchange
            if ( inputType($this) ) {
              $this.on('change.cosmui.toggler', toggle);
            }
            else {
              $this.on('click.cosmui.toggler', toggle);
            }
            
          });
          
          // open through hash
          if ( location.hash && location.hash != '' && location.hash != '#!' && $(location.hash).hasClass('closed') ) {
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
  	
      toggle : toggle,
      open : open,
      close : close,
      reload : init
      
  	};
  
  })( window.jQuery );

} else {
  console.log('[ERROR] Unable to add plugin -- make sure the cosmUI core (cosmui.js) is loaded before this script');
}