/* -------------------------------------------
 *
 * cosmUI v0.0.1
 *
 * Copyright 2012 Cosm, Inc
 * Licensed under the Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * ------------------------------------------- */

// ---------------------------------------
//
// http://www.JSON.org/json2.js (required)
//
 
var JSON;if(!JSON){JSON={}}(function(){function str(a,b){var c,d,e,f,g=gap,h,i=b[a];if(i&&typeof i==="object"&&typeof i.toJSON==="function"){i=i.toJSON(a)}if(typeof rep==="function"){i=rep.call(b,a,i)}switch(typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i){return"null"}gap+=indent;h=[];if(Object.prototype.toString.apply(i)==="[object Array]"){f=i.length;for(c=0;c<f;c+=1){h[c]=str(c,i)||"null"}e=h.length===0?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]";gap=g;return e}if(rep&&typeof rep==="object"){f=rep.length;for(c=0;c<f;c+=1){if(typeof rep[c]==="string"){d=rep[c];e=str(d,i);if(e){h.push(quote(d)+(gap?": ":":")+e)}}}}else{for(d in i){if(Object.prototype.hasOwnProperty.call(i,d)){e=str(d,i);if(e){h.push(quote(d)+(gap?": ":":")+e)}}}}e=h.length===0?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+g+"}":"{"+h.join(",")+"}";gap=g;return e}}function quote(a){escapable.lastIndex=0;return escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return typeof b==="string"?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function f(a){return a<10?"0"+a:a}"use strict";if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(a){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(a){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;if(typeof JSON.stringify!=="function"){JSON.stringify=function(a,b,c){var d;gap="";indent="";if(typeof c==="number"){for(d=0;d<c;d+=1){indent+=" "}}else if(typeof c==="string"){indent=c}rep=b;if(b&&typeof b!=="function"&&(typeof b!=="object"||typeof b.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":a})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&typeof e==="object"){for(c in e){if(Object.prototype.hasOwnProperty.call(e,c)){d=walk(e,c);if(d!==undefined){e[c]=d}else{delete e[c]}}}}return reviver.call(a,b,e)}var j;text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}})();

// ----------------------------------- 
//
// Namespace
//

var cosmUI = (function(){

  // ----------------------------------- 
	//
	// PRIVATE
	//
	var self = this ,

      // -----------------------------------
      // SETTINGS
      
      settings = {
        userMenu : {
          open    : true,
          enabled : true
        },
      
        animation : {
          slow : 500,
          normal : 250,
          fast : 150,
          types : {
            fade : ['fadeIn','fadeOut'],
            slide : ['slideDown','slideUp'],
            showHide : ['show','hide']
          },
          enabled : true
        }
      
      },

      // -----------------------------------
      // DISABLE ALL ANIMATIONS
      
      disableAnimations = function(){
        settings.animation.enabled = false;
        settings.animation.fast = 0;
        settings.animation.normal = 0;
        settings.animation.slow = 0;
        return false;
      },

      // -----------------------------------
      // GET SCREEN SIZE
      
      screenSize = function(){
        return $('html').width();
      },

      // -----------------------------------
      // GLOBAL TIMER VAR
      
      timer,

      // -----------------------------------
      // TRANSITIONS SETTINGS
        
      transitions = { 
        enabled : function () {
          return Modernizr && Modernizr.csstransitions;
        },
        transEndEventNames : {
            'WebkitTransition' : 'webkitTransitionEnd',
            'MozTransition'    : 'transitionend',
            'OTransition'      : 'oTransitionEnd',
            'msTransition'     : 'MSTransitionEnd',
            'transition'       : 'transitionend'
        },
        getTransitionEnd : function () {
          return transitions.transEndEventNames[ Modernizr.prefixed('transition') ];
        }
      },

      // -----------------------------------
      // CUSTOM ERROR LOGGING
      
      error = function( msg, el ) {
        $('html').trigger('cosmui.error',[ msg , el ]);
      },

      // -----------------------------------
      // COOKIE HELPERS
      
      cookie = {
        create : function (name,value,days) {
        	if (days) {
        		var date = new Date();
        		date.setTime(date.getTime()+(days*24*60*60*1000));
        		var expires = "; expires="+date.toGMTString();
        	}
        	else var expires = "";
        	document.cookie = name+"="+value+expires+"; path=/";
        },
        
        read : function (name) {
        	var nameEQ = name + "=";
        	var ca = document.cookie.split(';');
        	for(var i=0;i < ca.length;i++) {
        		var c = ca[i];
        		while (c.charAt(0)==' ') c = c.substring(1,c.length);
        		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        	}
        	return null;
        },
        
        erase : function (name) {
        	cookie.create(name,"",-1);
        }
      },

      // ----------------------------------- 
    	// GET TARGET HELPER
 
    	getTarget = function( el ) {
        var $el = $(el) ,
            selector = $el.attr('data-target'),
            $target;
        
        if ( !selector ) {
          selector = $el.attr('href');
          selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ''); //strip for ie7
        }  
        
        if ( selector == 'next' ) { $target = $el.next(); }
        else if ( selector == 'previous' || selector == 'prev' ) { $target = $el.prev(); }
        else { $target = $( selector ); }  
        
    		return $target;
    	},

      // ----------------------------------- 
    	// QUEUE HELPER
    	//
    	
    	queue = {
        clearPopups : [],
        trigger : function ( obj ) {          
          if (obj && cosmUI.queue[obj]) { 
            for (var i = 0; i < cosmUI.queue[obj].length; i++) {
              (cosmUI.queue[obj][i])();
            } 
          }
          return false;
        }
    	},

      // --------------------------------------------- 
    	// AUTO-SELECT HELPER
    	//
    	// Autoselect fields with data-autoselect="true"
    	
    	autoselect = (function(){
        
        $(document).on('focus', '[data-autoselect="true"]' ,function(event) {          
          var elm = this;        
          event.preventDefault();
          window.setTimeout(function(){ if (elm && elm.setSelectionRange) { elm.setSelectionRange(0,9999); } },100);
        });
        
    	})(),

      // ------------------------------------
    	// USER MENU PERSISTENCY
    	//
    	// Maintain user menu open with cookies
    	
    	userMenu = function(){ 
        var $menu = $('.user-menu-links'),
            state = cookie.read('cosmui.usermenu.state');
        
        // do stuff if - enabled AND not feed page AND screen is not adapted
        if (settings.userMenu.enabled && !$('.datastream-box').length && !$('.feed-metadata').length && screenSize() > 880) { 
          
          // set default if no state could be read
          if ( state == null ) {
            state = settings.userMenu.open;
            cookie.create('cosmui.usermenu.state', settings.userMenu.open, 31);
          }
          
          // parse state
          state = JSON.parse(state);
          
          // if open state, open the menu
          if (state) {
            $menu.slideDown(settings.animation.fast, function(){
              $menu.removeClass('closed');
              $menu.prev('a').addClass('active');
            });
          }
          
          // save open state
          $menu.on('cosmui.toggler.open', function() {
            cookie.create('cosmui.usermenu.state', true, 31);
          });
          
          // save closed state
          $menu.on('cosmui.toggler.close', function() {
            cookie.create('cosmui.usermenu.state', false, 31);
          });
          
          return state;
        }
        else {
          return false;
        }
        
    	},

      // ----------------------------------- 
    	// POLYFILLS
    	
    	polyfill = {

        // PLACEHOLDERS
        
      	placeholder : function(){
          
          $('[placeholder]').each(function() {
            var $this = $(this),
                pos = $this.position(),
                posTop = parseInt(pos.top,10) + parseInt($this.css('padding-top'),10) + 'px',
                posLeft = parseInt(pos.left,10) + parseInt($this.css('padding-left'),10) + 'px',
                xDisplay = "block";
            
            if($this.val() != '') {
              xDisplay = "none";
            }
            
            $('<span/>', 
              { 
                'class': "placeholder", 
                html: $this.attr('placeholder') 
              })
              .insertAfter($this)
              .css({
                position: "absolute",
                top: posTop,
                left: posLeft,
                'line-height': '20px',
                "font-size": '13px',
                display: xDisplay
              })
              .on('click',function() {
                var $self = $(this);
                $self.prev().focus();
              });
            
            $this
              .on('focus',function(){
                var $self = $(this);
                $(this).next('.placeholder').hide();
              })
              .on('blur',function(){
                var $self = $(this);
                if ($self.val() == '') {
                  $(this).next('.placeholder').show();
                }
              });
          });
          
      	},

        // ICONS (disclaimer: it's a bit hack-y since there's no way to access "content" property of pseudo-elements)
        
      	generatedContent : function(){

          var $this,
              iconClass,
              mapping = {
                "icon-activity"       : "&amp;",
                "icon-phone"          : "*",
                "icon-plus"           : "+",
                "icon-plus-alt"       : ">",
                "icon-user"           : "f",
                "icon-watch"          : "E",
                "icon-followers"      : "E",
                "icon-feed-followed"  : "E",
                "icon-feed-owned"     : "6",
                "icon-feed-default"   : "6",
                "icon-map-view"       : ",",
                "icon-list-view"      : "4",
                "icon-settings"       : "(",
                "icon-search"         : "s",
                "icon-expand"         : "/",
                "icon-contract"       : "-",
                "icon-comments"       : "b",
                "icon-forum"          : "b",
                "icon-trigger"        : "^",
                "icon-warning"        : "!",
                "icon-info"           : "=",
                "icon-error"          : "X",
                "icon-success"        : "%",
                "icon-logout"         : "q",
                "icon-apps"           : "D",
                "icon-app"            : "D",
                "icon-keys"           : "n",
                "icon-fullscreen"     : "#",
                "icon-tags"           : "$",
                "icon-tag"            : "$",
                "icon-grid"           : "9",
                "icon-edit"           : "e",
                "icon-delete"         : "d",
                "icon-mail"           : "m",
                "icon-contact"        : "m",
                "icon-compass"        : "c",
                "icon-badge"          : "b",
                "icon-examples"       : "7",
                "icon-tutorials"      : "t",
                "icon-regenerate"     : "r",
                "icon-refresh"        : "r",
                "icon-libraries"      : "l",
                "icon-arrow-right"    : "G",
                "icon-twitter"        : "T",
                "icon-api-docs"       : "I",
                "icon-layout"         : "a",
                "icon-elements"       : "5",
                "icon-components"     : "1",
                "icon-objects"        : "6",
                "icon-http-post"      : "I",
                "icon-http_post"      : "I",
                "icon-dashboard"      : "3",
                "icon-private"        : "p",
                "icon-graph-builder"  : "g",
                "icon-debug"          : "&lt;",                
                "icon-hardware"       : "1"
              };

          $('.icon').each(function(){
            $this = $(this);
            iconClass = $this.attr("class");
            if (iconClass.indexOf("icon-only") != -1) {
              iconClass = iconClass.replace(/icon-only/,"");
            }
            iconClass = iconClass.replace(/^.*?icon-/,"icon-").replace(/ .*$/,"");
            $this.prepend( $('<i/>', { "class":"icon icon-fallback "+ iconClass , html: mapping[iconClass] }) );
          });

          $('.dropdown-toggle, .user-menu-button').each(function(){
            $this = $(this);
            iconClass = 'icon-expand';
            $this.append( $('<i/>', { "class":"icon icon-fallback "+ iconClass , html:mapping[iconClass] }) );
          });
          
          $('[data-badge]').each(function(){
            $this = $(this);
            $this.append( $('<span/>', { "class":"badge-fallback" , html: $this.attr('data-badge') }) );
          });
          
          $('.field.required > label').each(function(){
            $this = $(this);
            $this.append( $('<span/>', { "class":"required-label-fallback" , html: " *" }) );
          });
          
          $('.feed-metadata .no-map').each(function(){
            $this = $(this);
            $this.append( $('<span/>', { "class":"icon-fallback" , html: "," }) );
          });
                	
      	}
      	
      },

      // ---------------------------------------------------------------
    	// INFLATE VALUES
    	//
    	// Scale current value on feed page when it's bigger than supposed
    	
    	inflate = function(el, opt) {
        var $value      = $(el),
            width       = $value.width(),
            chars       = $value.html().length,
            options = {
              'compression' : 0.57,
              'maxWidth'    : 300,
              'minFontSize' : Number.NEGATIVE_INFINITY,
              'maxFontSize' : Number.POSITIVE_INFINITY
            },
            fontSize;
        
        if ( opt ) { 
          $.extend( options, opt );
        }
            
        if (parseInt(width) >= options.maxWidth) {
          fontSize = Math.max( Math.min( width / (chars * options.compression), parseFloat(options.maxFontSize) ), parseFloat(options.minFontSize) );          
          $value.animate({ 'font-size': fontSize + 'px' }, settings.animation.fast);
        }
    	},
	
      // -----------------------------------
    	// UPDATE DATASTREAM VALUE
    	
    	updateValue = (function() {
        var closeAll = function() {
              $('div.tipsy').first().hide();
              $('.datastream-graph-value.editable').attr('data-cosmui','');
              $('.datastream-edit-value').hide().removeClass('visible');
            },
            toggle = function( el ) {
              if (!el) { closeAll(); return true; }          
              var $this             = $(el),
                  valuePos          = $this.position(),
                  $popup            = $this.closest('.box-content').find('.datastream-edit-value'), 
                  popupWidth        = $popup.outerWidth(),
                  popupHeight       = $popup.outerHeight(), 
                  $table            = $this.closest('.datastream-table'),
                  tableWidth        = $table.outerWidth(),
                  tablePos          = $table.position(),
                  currentValueWidth = $this.closest('.datastream-graph-current-value').outerWidth(),     
                  finalPos          = { 
                                        top       : tablePos.top + valuePos.top - popupHeight - 8 + 'px', 
                                        left      : 'auto',
                                        right     : 36 + (currentValueWidth / 2) - 20 + 'px',
                                        'z-index' : 10010
                                      };
              if ($popup.hasClass('visible')) { closeAll(); return true; }
              closeAll();
              if (screenSize() < 520) { 
                finalPos.right = 18 + (currentValueWidth / 2) - 22 + 'px'; 
                if (parseInt(finalPos.right) > 60) {
                  finalPos.right = '60px';
                }
              }
              $popup.css(finalPos).show().addClass('visible').find('input[type="text"]').focus();
              return true;
            },
            init = function() {
            	if ($('.datastream-graph-value.editable').length && $('.datastream-edit-value').length) {
                $('.datastream-graph-value.editable').on('click', function(e){
                  $('.datastream-graph-value.editable').tipsy('hide').tipsy('disable');
                  toggle(e.target);
                });
                
                $('.datastream-edit-value').on('click', function(){
                  $('.datastream-graph-value.editable').tipsy('hide').tipsy('disable');
                });
                
                queue.clearPopups.push(closeAll);
                
                return true;
            	}
            	else {
                return false;
            	}
            };
            
        init();
      	
      	return {
          reload   : init,
          toggle   : toggle,
          closeAll : closeAll
      	};
    	})(),
	
      // -----------------------------------
    	//
    	// INIT
    	//
    	
    	init = function () {
      	
        // -----------------------------------
      	// USERMENU INIT
      	
      	userMenu();
      	
        // -----------------------------------
      	// POLYFILL INIT
      	
      	if ( !Modernizr.input.placeholder )  { polyfill.placeholder(); }
      	if ( !Modernizr.generatedcontent )   { polyfill.generatedContent(); }
      	
        // -----------------------------------
      	// INFLATE INIT
      		
        // feed page
        
        var currentValuesWidths = [],
            onDone = function () {
              if ($("html").hasClass("ie7")) {
                $(this).css("filter","none");
              }
            };
        
        $('.datastream-graph-current-value')
          .each(function(index, el){
            var $el = $(el),
                $value = $el.find('.datastream-graph-value');
                
            if (screenSize() > 520) {        
              // value
              inflate($value, { 
                compression: 0.57,
                maxFontSize: 60, 
                minFontSize: 12 
              });
              $value.animate({ opacity: 1 }, settings.animation.fast, onDone);
              $el.addClass('loaded');
              
              // unit
              $value = $el.find('.datastream-graph-unit');
              inflate($value, { 
                compression: 0.57,
                maxFontSize: 20, 
                minFontSize: 11 
              });
              $value.animate({ opacity: 1 }, settings.animation.fast, onDone);    
            }
            else {
              // value
              inflate($value, { 
                compression: 1.1,
                maxWidth   : 150,
                maxFontSize: 60, 
                minFontSize: 10
              });
              $value.animate({ opacity: 1 }, settings.animation.fast, onDone);
              $el.addClass('loaded');
              
              // unit
              $value = $el.find('.datastream-graph-unit');
              inflate($value, { 
                compression: 0.85,
                maxWidth   : 150,
                maxFontSize: 20, 
                minFontSize: 10 
              });
              $value.animate({ opacity: 1 }, settings.animation.fast, onDone);
            }
            
            currentValuesWidths.push(parseInt($el.width(),10));
          })
          .animate({ width : Math.max.apply(Math,currentValuesWidths) +"px" }, settings.animation.fast, function(){
            $(this).trigger("cosmui.graph.ready");
          });
        
        // ----------------------------------- 
      	// CONSOLE VALUE EXPAND 
        
        if (!$('html').hasClass('ie9') && !$('html').hasClass('oldie') && screenSize() > 520) {
          $('.feed-datastream-current-value').each(function(index, el){
            var $el = $(el),
                $value = $el.find('.feed-datastream-value'),
                $unit = $el.find('.feed-datastream-unit');
                
            if ( $value.outerWidth(true) + $unit.outerWidth(true) > 200 ) { 
              if (!$('#current-value-hover').length) {
                $('<div/>', {
                  'id': 'current-value-hover',
                  html: '<span class="feed-datastream-value"></span><span class="feed-datastream-unit"></span>',
                  'style': 'display:none'
                }).appendTo('body');
              }
                
              $el.on('mouseleave.cosmui', function(){
                clearTimeout(timer);
              });
              
              $el.on('mouseenter.cosmui', function(){
                var $this = $(this),
                    $value = $this.find('.feed-datastream-value'),
                    $unit = $this.find('.feed-datastream-unit'),
                    $hover = $('#current-value-hover'),
                    targetWidth = $value.outerWidth(true) + $unit.outerWidth(true),
                    pos = $this.offset();
                pos.top -= 2;
                pos.left -= 10;
                
                timer = setTimeout(function(){        
                  $hover.find('.feed-datastream-value').html($value.text());
                  $hover.find('.feed-datastream-unit').html($unit.text());
                  if ($unit.text() == '') { targetWidth += 6 }
                  $hover
                    .css({ width: '200px', 'max-width': 'none', top: pos.top +'px', left: pos.left +'px' })
                    .show()
                    .stop().animate({ left: (pos.left - ( targetWidth - 200 )) +'px' , width: targetWidth + 'px' }, settings.animation.fast);
                
                  $hover.one('mouseleave.cosmui', function(){
                      $hover = $('#current-value-hover'),
                      pos = $this.offset();
                    pos.top -= 2;
                    pos.left -= 10;
                    
                    $hover
                      .stop().animate({ left: pos.left +'px' , width: '200px' }, settings.animation.fast, function(){
                        $(this).hide().css({ width: '', 'max-width': '', top: '', left: '' });
                      });
                  });
                }, 250);
              });
            }
          });
        }
      	
        // -----------------------------------
      	// DEV STUFF
      	
      	if (window.console && location.href.indexOf('appdev.loc') != -1) {
          // error logging
          $('html').on('cosmui.error',function(event,msg){
            console.log('[ERROR] '+ msg);
          });
      	}
      	
        // -----------------------------------
      	//
      	// GLOBAL EVENT HANDLERS
      	//
                
        // global escape key flush        
        $('html').on('keyup.cosmui', function(e) { if (e.keyCode == 27) { queue.trigger('clearPopups'); } });
      	
      	// Login re-focus link
      	$('a.login').on('click',function() {
          $(this).closest('.box').find('input[type="text"]').first().focus();
          return false;
      	});
      	
        // get started
      	$('.sign-up form').on('cosmui.toggler.open-before',function() { 
          $("html, body").animate({
      			scrollTop: ( $(this).closest('.sign-up').offset().top - 22 ) + "px"
      		}, {
      			duration: settings.animation.slow,
      			easing: "swing"
      		});
      	});
      	$('.sign-up form').on('cosmui.toggler.open-after',function() {
          $(this).find('input[type="email"]').first().focus();
          return false;
      	});
      	
        // console map hover
      	$('.feed-summary-map').on('mouseenter',function() {
          $(this).prev('.with-pointer').stop().animate({ opacity: 0, top: '-20px' },settings.animation.fast);
          $(this).find('.feed-summary-map-center').stop().animate({ opacity: 0.8 },settings.animation.normal);
          return false;
      	});
      	$('.feed-summary-map').on('mouseleave',function() {
          $(this).prev('.with-pointer').stop().animate({ opacity: 1, top: '-3px' },settings.animation.fast);
          $(this).find('.feed-summary-map-center').stop().animate({ opacity: 0 },settings.animation.fast);
          return false;
      	});
        
        // TODO get this in rails
       	$('.comments-box .dropdown-menu').addClass('aligned-right');
       	
       	// Chrome slidedown bug with select boxes
       	$('body').on('cosmui.toggler.open-before',function(e){
       	  var $this = $(e.target);
       	  $this.find('select').css('visibility','hidden');
       	});
       	$('body').on('cosmui.toggler.close-before',function(e){
       	  var $this = $(e.target);
       	  $this.find('select').css('visibility','hidden');
       	});
       	$('body').on('cosmui.toggler.open-after',function(e){
       	  var $this = $(e.target);
       	  $this.find('select').css('visibility','');
       	});
       	$('body').on('cosmui.toggler.close-after',function(e){
       	  var $this = $(e.target);
       	  $this.find('select').css('visibility','');
       	});
       	
       	return true;
    	
    	};
  
  // Fire init()
  init();
	
	return {	
    // -----------------------------------
    //
    // PUBLIC
    //
    
    reload            : init,
    userMenu          : userMenu,
    polyfill          : polyfill,
    cookie            : cookie,
    settings          : settings,
    screenSize        : screenSize,
    transitions       : transitions,
    queue             : queue,    
    getTarget         : getTarget,
    error             : error,
    inflate           : inflate,
    updateValue       : updateValue,
    disableAnimations : disableAnimations
	};
 
})();