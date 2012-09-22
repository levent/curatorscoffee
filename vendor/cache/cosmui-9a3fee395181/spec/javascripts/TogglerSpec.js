describe("Toggler", function() {

  beforeEach(function() {
    loadFixtures('toggler.fixture.html');
    cosmUI.toggler.reload();
    cosmUI.disableAnimations();
  });

  describe("global", function() {
    it("should toggle the element with the id that is in the href of the toggle",function(){
      var $el = $('#test1'),
          $target = $($el.attr('href'));
      expect( $target ).not.toHaveClass('closed');
      cosmUI.toggler.toggle( $target );
      expect( $target ).toHaveClass('closed');
    });
    
    it("should toggle the element with the id that is in the data-target of the toggle",function(){
      var $el = $('#test2'),
          $target = $($el.attr('data-target'));
      expect( $target ).toHaveClass('closed');
      cosmUI.toggler.toggle( $target );
      expect( $target ).not.toHaveClass('closed');
    });
    
    it("should toggle the element on click",function(){
      var $el = $('#test1'),
          $target = $($el.attr('href'));
      expect( $target ).not.toHaveClass('closed');
      $el.click();
      expect( $target ).toHaveClass('closed');
    });
    
    it("should toggle a radio input element on change",function(){
      var $el = $('#test3'),
          $el2 = $('#test4')
          $target = $($el.attr('data-target'));
      expect( $target ).not.toHaveClass('closed');
      // using two clicks because if it samples better that the event listened is the onchange and not onclick
      $el.click();
      $el.click();
      expect( $target ).toHaveClass('closed');
    });
    
    it("should toggle a checkbox input element on change",function(){
      var $el = $('#test4')
          $target = $($el.attr('data-target'));
      expect( $target ).not.toHaveClass('closed');
      $el.change();
      expect( $target ).toHaveClass('closed');
    });
    
    it("should slide down a closed element without an animation type",function(){
      var $el       = $('#test1'),
          $target,
          slideDown = spyOn($.fn, 'slideDown').andCallThrough();
      $el.attr('data-target','#toggler2');
      $target = $($el.attr('data-target'));
      expect( $el.attr('data-animation') ).toBe(undefined);
      expect( $target ).toHaveClass('closed');
      $el.click();
      expect( slideDown ).toHaveBeenCalled();
    });
    
    it("should slide up an open element without animation type",function(){
      var $el     = $('#test1'),
          $target = $($el.attr('data-target')),
          slideUp = spyOn($.fn, 'slideUp').andCallThrough();
      expect( $el.attr('data-animation') ).toBe(undefined);
      expect( $target ).not.toHaveClass('closed');
      $el.click();
      expect( slideUp ).toHaveBeenCalled();
    });
    
    it("should slide down a closed element with a 'slide' animation type",function(){
      var $el        = $('#test2-1'),
          $target    = $($el.attr('data-target')),
          slideDown  = spyOn($.fn, 'slideDown').andCallThrough();
      expect( $el.attr('data-animation') ).toBe('slide');
      expect( $target ).toHaveClass('closed');
      $el.click();
      expect( slideDown ).toHaveBeenCalled();
    });
    
    it("should slide up an open element with a 'slide' animation type",function(){
      var $el      = $('#test2-1'),
          $target,
          slideUp  = spyOn($.fn, 'slideUp').andCallThrough();
      $el.attr('data-target','#toggler1');
      $target = $($el.attr('data-target'));
      expect( $el.attr('data-animation') ).toBe('slide');
      expect( $target ).not.toHaveClass('closed');
      $el.click();
      expect( slideUp ).toHaveBeenCalled();
    });
    
    it("should fade in a closed element with a 'fade' animation type",function(){
      var $el     = $('#test2'),
          $target = $($el.attr('data-target')),
          fadeIn  = spyOn($.fn, 'fadeIn').andCallThrough();
      expect( $el.attr('data-animation') ).toBe('fade');
      expect( $target ).toHaveClass('closed');
      $el.click();
      expect( fadeIn ).toHaveBeenCalled();
    });
    
    it("should fade out an open element with a 'fade' animation type",function(){
      var $el      = $('#test2'),
          $target,
          fadeOut  = spyOn($.fn, 'fadeOut').andCallThrough();
      $el.attr('data-target','#toggler1');
      $target = $($el.attr('data-target'));
      expect( $el.attr('data-animation') ).toBe('fade');
      expect( $target ).not.toHaveClass('closed');
      $el.click();
      expect( fadeOut ).toHaveBeenCalled();
    });
    
    it("should use show() on a closed element with a 'showHide' animation type",function(){
      var $el     = $('#test2-2'),
          $target = $($el.attr('data-target')),
          show    = spyOn($.fn, 'show').andCallThrough();
      expect( $el.attr('data-animation') ).toBe('showHide');
      expect( $target ).toHaveClass('closed');
      $el.click();
      expect( show ).toHaveBeenCalled();
    });
    
    it("should use hide() on an open element with a 'showHide' animation type",function(){
      var $el      = $('#test2-2'),
          $target,
          hide  = spyOn($.fn, 'hide').andCallThrough();
      $el.attr('data-target','#toggler1');
      $target = $($el.attr('data-target'));
      expect( $el.attr('data-animation') ).toBe('showHide');
      expect( $target ).not.toHaveClass('closed');
      $el.click();
      expect( hide ).toHaveBeenCalled();
    });
    
    it("should close visible data-children below data-parent if both data-children and data-parent are specified",function(){
      var $el = $('#accordion-2'),
          $parent = $($el.attr('data-parent')),
          $children = $( $parent.attr('data-children') ).filter(':visible');
      expect($children).not.toHaveClass('closed');
      $el.click();
      expect($children).toHaveClass('closed');
    });
    
    it("should close other .accordion-content below data-parent if data-parent is specified",function(){
      var $el = $('#accordion2-2'),
          $parent = $($el.attr('data-parent')),
          $children = $parent.find('.accordion-content').filter(':visible');
      expect($children).not.toHaveClass('closed');
      $el.click();
      expect($children).toHaveClass('closed');
    });    
    
    it("should not close the target if 'opener' is specified in data-cosmui",function(){
      var $el = $('#test2-3'),
          $target = $($el.attr('data-target'));
      expect( $el.attr('data-cosmui') ).toContain('opener');
      expect( $target ).not.toHaveClass('closed');
      $el.click();
      expect( $target ).not.toHaveClass('closed');      
    });
    
    it("should not open the target if 'closer' is specified in data-cosmui",function(){
      var $el = $('#test2-4'),
          $target = $($el.attr('data-target'));
      expect( $el.attr('data-cosmui') ).toContain('closer');
      expect( $target ).toHaveClass('closed');
      $el.click();
      expect( $target ).toHaveClass('closed');  
    });
    
    it("should not close target if it has .always-open",function(){
      var $el = $('#test2-5'),
          $target = $($el.attr('data-target'));
      expect( $target ).toHaveClass('always-open');
      expect( $target ).not.toHaveClass('closed');
      $el.click();
      expect( $target ).not.toHaveClass('closed');
    });
  });

  describe("toggle", function() {
    it("should do nothing if no argument is passed",function(){
      var error = false;
      $('html').one('cosmui.error', function(event, data){
        error = true;
      });
      expect(cosmUI.toggler.toggle()).toEqual(false);
      expect(error).toEqual(true);
    });
    
    it("should do nothing if the target is not present in the document",function(){
      var error = false;
      $('html').one('cosmui.error', function(event, data){
        error = true;
      });
      expect( cosmUI.toggler.toggle($('.this-element-does-not-exist')) ).toEqual(false);
      expect(error).toEqual(true);
    });
    
    it("should close the element passed if it is open",function(){
      var $target = $('#toggler1');
      expect( $target ).not.toHaveClass('closed');
      cosmUI.toggler.toggle( $target );
      expect( $target ).toHaveClass('closed');      
    });
    
    it("should open the element passed if it is closed",function(){
      var $target = $('#toggler2');
      expect( $target ).toHaveClass('closed');
      cosmUI.toggler.toggle( $target );
      expect( $target ).not.toHaveClass('closed');      
    });
  });

  describe("open", function() {
    it("should do nothing if no argument is passed",function(){
      var error = false;
      $('html').one('cosmui.error', function(event, data){
        error = true;
      });
      expect(cosmUI.toggler.open()).toEqual(false);
      expect(error).toEqual(true);
    });
    
    it("should do nothing if the target is not present in the document",function(){
      var error = false;
      $('html').one('cosmui.error', function(event, data){
        error = true;
      });
      expect( cosmUI.toggler.open($('.this-element-does-not-exist')) ).toEqual(false);
      expect(error).toEqual(true);
    });
    
    it("should do nothing if the target is open",function(){
      var $target = $('#toggler1');
      expect( $target ).not.toHaveClass('closed');
      cosmUI.toggler.open( $target );
      expect( $target ).not.toHaveClass('closed');
    });
    
    it("should open the element passed if it is closed",function(){
      var $target = $('#toggler2');
      expect( $target ).toHaveClass('closed');
      cosmUI.toggler.open( $target );
      expect( $target ).not.toHaveClass('closed');
    });
  });

  describe("close", function() {
    it("should do nothing if no argument is passed",function(){
      var error = false;
      $('html').one('cosmui.error', function(event, data){
        error = true;
      });
      expect(cosmUI.toggler.close()).toEqual(false);
      expect(error).toEqual(true);
    });
    
    it("should do nothing if the target is not present in the document",function(){
      var error = false;
      $('html').one('cosmui.error', function(event, data){
        error = true;
      });
      expect( cosmUI.toggler.close($('.this-element-does-not-exist')) ).toEqual(false);
      expect(error).toEqual(true);
    });
    
    it("should do nothing if the target is closed",function(){
      var $target = $('#toggler2');
      expect( $target ).toHaveClass('closed');
      cosmUI.toggler.close( $target );
      expect( $target ).toHaveClass('closed');
    });
    
    it("should close the element passed if it is open",function(){
      var $target = $('#toggler1');
      expect( $target ).not.toHaveClass('closed');
      cosmUI.toggler.close( $target );
      expect( $target ).toHaveClass('closed');
    });
  });
});






