describe("AddDevice", function() {

  beforeEach(function() {
    loadFixtures('add-device.fixture.html');
    cosmUI.steps.reload();
    cosmUI.disableAnimations();
  });

  describe("get", function() {
    
    it("should do nothing and throw an error event if no arguments are passed",function(){
      
      var error = false;
      $('html').one('cosmui.error', function(event, data){
        error = true;
      });
      expect(cosmUI.steps.get()).toEqual(false);
      expect(error).toEqual(true);
      
    });
    
    it("should do nothing and throw an error event if no url is able to be retrieved from the element passed",function(){
      
      var error = false;
      $('html').one('cosmui.error', function(event, data){
        error = true;
      });
      expect(cosmUI.steps.get('section:first-child')).toEqual(false);
      expect(error).toEqual(true);
      
    });
    
    it("should make an ajax request to the url in data-url",function(){
      
      var $caller = $('#addDevice').find('.pick-one a').first(),
          url = $caller.attr('data-url'),
          ajax = spyOn($, 'ajax').andCallThrough();
      
      cosmUI.steps.get($caller);
      expect(ajax).toHaveBeenCalled();
      expect(ajax.argsForCall[0][0].url).toEqual(url);
      
    });
    
    it("should make an ajax request to the url passed in the arguments",function(){
      
      var $caller = $('#addDevice').find('.pick-one a').first(),
          url = 'fake/url/is/fake',
          ajax = spyOn($, 'ajax').andCallThrough();
      
      cosmUI.steps.get($caller,url);
      expect(ajax).toHaveBeenCalled();
      expect(ajax.argsForCall[0][0].url).toEqual(url);
      
    });
    
    it("should do nothing and throw an error event if there's no content retrieved",function(){
      
      var $caller = $('#addDevice').find('.pick-one a').first(),
          ajax = spyOn($, 'ajax').andCallFake(function(opt) {
            opt.success('data')
          });
      
      var spy = jasmine.createSpy();
      $('html').one('cosmui.error', spy);
      cosmUI.steps.get($caller);
      expect(ajax).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
      
    });
    
    it("should do nothing and throw an error event if content retrieved is not a form",function(){
      
      var $caller = $('#addDevice').find('.pick-one a').first(),
          ajax = spyOn($, 'ajax').andCallFake(function(opt) {
            opt.success($('<h3/>'))
          });
      
      var spy = jasmine.createSpy();
      $('html').one('cosmui.error', spy);
      cosmUI.steps.get($caller);
      expect(ajax).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
      
    });
    
    it("should do nothing and throw an error event if form retrieved is not the right one",function(){
      
      var $caller = $('#addDevice').find('.pick-one a').first(),
          ajax = spyOn($, 'ajax').andCallFake(function(opt) {
            opt.success($('<form/>'))
          }),
          error = jasmine.createSpy();
          
      $('html').one('cosmui.error', error);
      cosmUI.steps.get($caller);
      expect(ajax).toHaveBeenCalled();
      expect(error).toHaveBeenCalled();
      
    });
    
    it("should hide the start screen",function(){
      
      var $modal = $('#addDevice'),
          $caller = $modal.find('.pick-one a').first(),
          ajax = spyOn($, 'ajax').andCallFake(function(opt) {
            opt.success($('#form-steps'))
          });
          
      cosmUI.steps.get($caller);
      expect($modal.find('.box-header').not('.form-steps-header')).not.toBeVisible();
      expect($modal.find('.pick-one')).not.toBeVisible();
      
    });
    
    it("should show the new retrieved header in the header of the modal",function(){
      
      var $modal = $('#addDevice'),
          $caller = $modal.find('.pick-one a').first(),
          ajax = spyOn($, 'ajax').andCallFake(function(opt) {
            opt.success($('#form-steps'))
          });
          
      cosmUI.steps.get($caller);
      expect($modal.find('.form-steps-header')).toExist();
      expect($modal.find('.form-steps-header')).toBeVisible();
      
    });
    
    it("should show the new retrieved form-steps in the content of the modal",function(){
      
      var $modal = $('#addDevice'),
          $caller = $modal.find('.pick-one a').first(),
          ajax = spyOn($, 'ajax').andCallFake(function(opt) {
            opt.success($('#form-steps'))
          });
          
      cosmUI.steps.get($caller);
      expect($modal.find('.box-content .form-steps')).toExist();
      expect($modal.find('.box-content .form-steps')).toBeVisible();
      
    });
    
  });

  describe("next", function() {
    
    it("should do nothing and throw an error event if no arguments are passed",function(){
      
      var error = jasmine.createSpy();
      $('html').one('cosmui.error', error);
      
      expect(cosmUI.steps.next()).toEqual(false);
      expect(error).toHaveBeenCalled();
      
    }); 
    
    it("should hide the current step",function(){
      
      var $formSteps = $('#form-steps'),
          $current = $formSteps.find('section').first();
          
      expect($current.find('.accordion-content')).not.toHaveClass('closed');
      cosmUI.steps.next($current);
      expect($current.find('.accordion-content')).toHaveClass('closed');
      
    });
    
    it("should show the next step",function(){
      
      var $formSteps = $('#form-steps'),
          $current = $formSteps.find('section').first(),
          $next = $current.next();
          
      expect($next.find('.accordion-content')).toHaveClass('closed');
      cosmUI.steps.next($current);
      expect($next.find('.accordion-content')).not.toHaveClass('closed');
      
    });
    
    it("should mark current step as successful",function(){
      
      var $formSteps = $('#form-steps'),
          $current = $formSteps.find('section').first();
          
      expect($current).not.toHaveClass('success');
      cosmUI.steps.next($current);
      expect($current).toHaveClass('success');
      
    });
    
    it("should enable the accordion toggle on next step",function(){
      
      var $formSteps = $('#form-steps'),
          $current = $formSteps.find('section').first(),
          $next = $current.next(),
          $toggle = $next.find('.accordion-header'),
          text = $toggle.text();
          
      expect($toggle[0].tagName.toLowerCase()).toBe('span');
      expect($toggle).toHaveClass('disabled');
      cosmUI.steps.next($current);
      $toggle = $next.find('.accordion-header');
      expect($toggle[0].tagName.toLowerCase()).toBe('a');
      expect($toggle).not.toHaveClass('disabled');
      expect($toggle).toHaveAttr('data-cosmui', 'toggler');
      expect($toggle).toHaveAttr('data-target', 'next');
      expect($toggle).toHaveAttr('data-parent', '#form-steps');
      expect($toggle).toHaveText(text);
      
    });
  
  });

  describe("back", function() {
    
    it("should do nothing and throw an error event if no arguments are passed",function(){
      
      var error = jasmine.createSpy();
      $('html').one('cosmui.error', error);
      
      expect(cosmUI.steps.back()).toBe(false);
      expect(error).toHaveBeenCalled();
      
    }); 
    
    it("should hide the current step",function(){
      
      var $formSteps = $('#form-steps'),
          $current = $formSteps.find('section:nth-child(3)');
          
      cosmUI.steps.next($current.prev());    
      expect($current.find('.accordion-content')).not.toHaveClass('closed');
      cosmUI.steps.back($current);
      expect($current.find('.accordion-content')).toHaveClass('closed');
      
    });
    
    it("should show the previous step",function(){
      
      var $formSteps = $('#form-steps'),
          $current = $formSteps.find('section:nth-child(3)'),
          $prev = $current.prev();
          
      cosmUI.steps.next($prev);   
      expect($prev.find('.accordion-content')).toHaveClass('closed');
      cosmUI.steps.back($current);
      expect($prev.find('.accordion-content')).not.toHaveClass('closed');
      
    });
  
  });

  
});

