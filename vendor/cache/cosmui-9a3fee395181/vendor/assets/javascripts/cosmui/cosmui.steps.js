/* -------------------------------------------
 *
 * cosmUI Steps v0.0.1
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
   
  cosmUI.steps = (function( $ ){
    "use strict"
    
    // ----------------------------------- 
    // Private
    
    var globalSelector = '[data-cosmui*="steps"]',
        nextStepSelector = '[data-step="next"]',
        backStepSelector = '[data-step="back"]',
    
        // ----------------------------------- 
        // Next Step
        
        next = function ( current, next ) {
          var $caller,
              $current,
              $next;
              
          // current passed
          if ( current && $(current).length && $(current)[0].tagName ) {
            $current = $(current);
                      
            // next passed
            if ( next && $(next).length && $(next)[0].tagName ) {
              $next = $(next);
            }
            else {
              $next = $current.next();
            }
          }
          // event passed
          else if ( current && current.target ) {
            $caller = $(current.target);
            $current = $caller.closest('section');
            $next = $current.next();
          }
          // no current, no fun
          else {
            cosmUI.error('(cosmUI.steps.next) First argument (current section) is required.');
            return false;
          }
          
          $current.addClass('success').find('.accordion-content').removeClass('always-open');
          $next.find('.accordion-header').replaceWith( '<a class="accordion-header" href="#" data-cosmui="toggler" data-target="next" data-parent="#form-steps">' + $next.find('.accordion-header').text() + '</a>' );
          $next.find('.accordion-content').addClass('always-open');
          cosmUI.toggler.reload();          
          $next.find('.accordion-header').click();
          if (cosmUI.screenSize() > 520) {
            $next.find('input, textarea, button').first().focus();
          }
          
          return false;
        
        },
    
        // ----------------------------------- 
        // Back a Step
        
        back = function ( current, next ) {
          var $caller,
              $current,
              $next;
              
          // current passed
          if ( current && $(current).length && $(current)[0].tagName ) {
            $current = $(current);
                      
            // next passed
            if ( next && $(next).length && $(next)[0].tagName ) {
              $next = $(next);
            }
            else {
              $next = $current.prev();
            }
          }
          // event passed
          else if ( current && current.target ) {
            $caller = $(current.target);
            $current = $caller.closest('section');
            $next = $current.prev();
          }
          // no current, no fun
          else {
            cosmUI.error('(cosmUI.steps.back) First argument (current section) is required.');
            return false;
          }
          
          $current.removeClass('always-open');
          $next.find('.accordion-content').addClass('always-open');       
          $next.find('.accordion-header').click();
          if (cosmUI.screenSize() > 520) {
            $next.find('input, textarea, button').first().focus();
          }
          
          return false;
        
        },
    
        // ----------------------------------- 
        // Replace header
        
        replaceHeader = function (modal) {
          var $newHeader = $('.form-steps-header'),
              $modal = $(modal);
          $modal.find('.box-header').not('.form-steps-header').hide();
          $modal.prepend($('.form-steps-header'));
        },
    
        // ----------------------------------- 
        // Get Steps
        
        get = function ( e, url ) {
          if (!e) { 
            cosmUI.error('(cosmUI.steps.get) First argument (caller) is required.');
            return false; 
          }
          
          var $caller = (e && $(e).length && $(e)[0].tagName) ? $(e) : $(e.target);
          
          if ($caller && $caller.get(0) && $caller.get(0).tagName != 'a') {
            $caller = $caller.closest('a');
          }
          
          if ( !url || url == "" ) {
            if ( $caller.attr('data-url') && $caller.attr('data-url') != '' ) {
              url = $caller.attr('data-url');
            }
            else {
              cosmUI.error('(cosmUI.steps.get) Must specify url with data-url to get contents.');
              return false;
            }
          }
          
          // disable all other callers
          $(globalSelector)
            .find('.pick-one a')
            .off('click.cosmui.steps')
            .on('click.cosmui.steps', function() { return false; });
        
          // set loading
          $caller.css('color','transparent').addClass('loading-on-drawerBackground')
                 .closest('.modal').trigger('cosmui.steps.load-before');
          
          // do ajax request
          $.ajax({
            url: url,
            dataType: 'html',
            success: function(data) {
              // success
              var $modal = $caller.closest('.modal'),
                  $newContent = $(data);
               
              if (!$newContent || !$newContent.length) {
                cosmUI.error("(cosmUI.steps.get) Couldn't fetch content from "+ url +'.');
                return false;              
              }               
              else if ( $newContent[0].tagName != 'form' && !$newContent.hasClass('form-steps') ) { 
                cosmUI.error('(cosmUI.steps.get) Loaded should conform to standards (e.g. should return form and class is .form-steps).');
                return false; 
              }
              
              // hide pick selections and header title
              $modal.find('.pick-one').hide();
              $caller.css('color','').removeClass('loading-on-drawerBackground');
            
              // re-enable all other callers
              $(globalSelector)
                .find('.pick-one a')
                .off('click.cosmui.steps')
                .on('click.cosmui.steps', get);
              
              // add response content to the right places
              $modal.find('.box-content').append($newContent);
              
              replaceHeader($modal);
              
              // assign events to new content
              cosmUI.toggler.reload();
              $modal.find('.form-steps-header .close').on('click',cosmUI.modal.close);
              $modal.find('.accordion-content').on('cosmui.toggler.open-after', function() {
                if (cosmUI.screenSize() > 520) {
                  $(this).find('input, textarea, button').first().focus();
                }
              });
              
              // assign events to next step buttons
              $modal.find('.box-content '+ nextStepSelector).on('click.cosmui.steps', next);
              $modal.find('.box-content '+ backStepSelector).on('click.cosmui.steps', back);
              
              // focus the first input element
              if (cosmUI.screenSize() > 520) {
                $modal.find('.always-open input, .always-open textarea').first().focus();
              }
              
              // dispatch load-after event
              $modal.trigger('cosmui.steps.load-after');

              return false;
            },
            // handle error
            error: function() { 
              cosmUI.error('(cosmUI.steps.get) There was an error retrieving the content from '+ url);
              return false;
            } 
          });
          
          return false;
        
        },     
    
        // ----------------------------------- 
        // Revert to start screen  
        
        revert = function ( e ) { 
          var $modal = $(globalSelector);

          // remove specific stuff
          $modal.find('.form-steps-header, .form-steps').not('.custom-steps, .custom-steps .form-steps-header').remove();
          // show original content
          $modal.find('.pick-one, .box-header').show();
          
        },
    
        // ----------------------------------- 
        // Initialization
        
        init = function ( e ) {
          
          $(globalSelector)
            .find('.pick-one a')
            .on('click.cosmui.steps', get);
          
          $(globalSelector)
            .find('.box-content '+ nextStepSelector)
            .on('click.cosmui.steps', next);
          
          $(globalSelector)
            .find('.box-content '+ backStepSelector)
            .on('click.cosmui.steps', back);
            
          $(globalSelector).on('cosmui.modal.open', revert);
          $(globalSelector).on('cosmui.modal.close-after', revert);
          
          if (cosmUI.screenSize() > 520) {
            $(globalSelector).find('.always-open input, .always-open textarea').first().focus();
          }
          
          return false;
        
        };
  
    // ----------------------------------- 
    // Init
    
    init();
  	
    // ----------------------------------- 
    // Public
  	return {
  	
      reload        : init,
      revert        : revert,
      get           : get,
      next          : next,
      back          : back,
      replaceHeader : replaceHeader
      
  	};
  
  })( window.jQuery );

} else {
  console.log('[ERROR] Unable to add plugin -- make sure the cosmUI core (cosmui.js) is loaded before this script');
}
