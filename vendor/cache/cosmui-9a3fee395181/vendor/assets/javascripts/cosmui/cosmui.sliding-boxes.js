/* -------------------------------------------
 *
 * cosmUI Sliding Boxes v0.0.1
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
   
  cosmUI.slidingBoxes = (function( $ ){
    "use strict"
    
    // ----------------------------------- 
    // Private
    
    var globalSelector = '[data-cosmui*="sliding-boxes"]',
    
        // ----------------------------------- 
        // Close box
        
        close = function ( $this, $target, target ) {
        
          $this = $($this);
          $target = $($target);
          
          if (!$this.length || !$target.length) {
            cosmUI.error('(cosmUI.slidingBoxes.close) First argument (toggle) and second argument (box) are required.');
            return false;
          }
          
          // remove .active from toggle
          $this.removeClass('active');
          
          if (target && target.pos && target.pos.before) {
          // custom animation
            $target
              .animate({
                opacity: 0,
                top: target.pos.before[0],
                left: target.pos.before[1]
              }, 
              cosmUI.settings.animation.fast, 
              function(){
                $(this)
                  .css({
                    display: 'none'
                  })
                  .removeClass('open'); // remove .open from box
              });
          }
          else {
          // fade only
            $target
              .animate({
                opacity: 0
              }, 
              cosmUI.settings.animation.fast, 
              function(){
                $(this)
                  .css({
                    display: 'none'
                  })
                  .removeClass('open'); // remove .open from box
              });
          }
          
          // ie7 z-index
          if ( $('html').hasClass('ie7') ) {
            $this.closest('.more-info').css('z-index','');
          }
                  
          return false;
        
        },
    
        // ----------------------------------- 
        // Close all boxes
        
        closeAll = function ( ) {     
          
          if ($(globalSelector).find('.open').length) {
            close($(globalSelector).find('.active'), $(globalSelector).find('.open'));
          }
          
          return false;
        
        },
    
        // ----------------------------------- 
        // Open box
        
        open = function ( $this, $target, target ) {
        
          $this = $($this);
          $target = $($target);
          
          if (!$this.length || !$target.length) {
            cosmUI.error('(cosmUI.slidingBoxes.open) First argument (toggle) and second argument (box) are required.');
            return false;
          }
          
          // close others
          closeAll();
          
          // add .active to toggle
          $this.addClass('active');
          
          // ie7 z-index
          if ( $('html').hasClass('ie7') ) {
            $this.closest('.more-info').css('z-index',20);
          }
          
          if (target && target.pos && target.pos.before && target.pos.after) {
          // custom animation
            $target
              .css({
                top: target.pos.before[0],
                left: target.pos.before[1],
                opacity: 0,
                display: 'block'
              })
              .animate({
                opacity: 1,
                top: target.pos.after[0],
                left: target.pos.after[1]
              }, 
              cosmUI.settings.animation.fast, 
              function(){
                // add .open to box
                $(this).addClass('open');
              });
          }
          else {
          // fade only
            $target
              .css({
                opacity: 0,
                display: 'block'
              })
              .animate({
                opacity: 1
              }, 
              cosmUI.settings.animation.fast, 
              function(){
                // add .open to box
                $(this).addClass('open');
              });
          }        
          
          return false;
        
        },
    
        // ----------------------------------- 
        // Toggle box
        
        toggle = function ( el ) {
        
          var $this = $(this),
              $target = $this.next(),
              target = {
                pos : {
                  before : [], // top, left
                  after  : []   // top, left
                }        
              };
          
          // first - down
          target.pos.before[0] = '79px';
          target.pos.before[1] = 0;
          target.pos.after[0]  = '89px';
          target.pos.after[1]  = target.pos.before[1];      
          
          // second - up 
          if ($this.closest('.more-info').hasClass('second')) {
            target.pos.before[0] = '-151px';
            target.pos.before[1] = 0;
            target.pos.after[0]  = '-161px';
            target.pos.after[1]  = target.pos.before[1];
            
            if ($('html').hasClass('ie8')) {
              target.pos.before[0] = '-159px';
              target.pos.after[0]  = '-169px';
            }
          }
          
          // third - right
          if ($this.closest('.more-info').hasClass('third')) {
            target.pos.before[0] = '-10px';
            target.pos.before[1] = '79px';
            target.pos.after[0]  = target.pos.before[0];
            target.pos.after[1]  = '89px';  
          }
          
          // small screens and IE7
          if ( cosmUI.screenSize() < 520 || $('html').hasClass('ie7') ) {
            // second
            target.pos.before[0] = '70px';
            target.pos.before[1] = '-55px';
            target.pos.after[0]  = '80px';
            target.pos.after[1]  = target.pos.before[1];  
            
            // first
            if ($this.closest('.more-info').hasClass('first')) {
              target.pos.before[0] = '80px';
              target.pos.before[1] = '0';
              target.pos.after[0]  = '90px';
              target.pos.after[1]  = target.pos.before[1];  
            }
            
            // third
            if ($this.closest('.more-info').hasClass('third')) {
              target.pos.before[1] = '-105px';
              target.pos.after[1]  = target.pos.before[1];  
            }
          }
          
          if (!$target.hasClass('open')) { // open
            open($this, $target, target);
          }
          else {                           // close
            close($this, $target, target);
          }       
          
          return false;
        
        },
    
        // ----------------------------------- 
        // Initialization
        
        init = function ( e ) {
        
          $(globalSelector).find('.more-info a').on('click.cosmui.sliding-boxes', toggle);
          $('html').on('click.cosmui.sliding-boxes', function(e) { 
            if (!$(e.target).closest(globalSelector).length ) {
              closeAll();
            }
          });
          cosmUI.queue.clearPopups.push(closeAll);
          
          return false;
        
        };
  
    // ----------------------------------- 
    // Init
    
    init();
  	
    // ----------------------------------- 
    // Public
  	return {
  	
      reload   : init,
      open     : open,
      close    : close,
      closeAll : closeAll
      
  	};
  
  })( window.jQuery );

} else {
  console.log('[ERROR] Unable to add plugin -- make sure the cosmUI core (cosmui.js) is loaded before this script');
}