describe("SlidingBoxes", function() {

  beforeEach(function() {
    loadFixtures('sliding-boxes.fixture.html');
    cosmUI.slidingBoxes.reload();
    cosmUI.settings.animation.enabled = false;
    cosmUI.settings.animation.fast = 0;
    cosmUI.settings.animation.normal = 0;
  });

  describe("close", function() {
    
    it("should do nothing and throw an error event if no arguments are passed",function(){
      
      var error = false;
      $('html').one('cosmui.error', function(event, data){
        error = true;
      });
      expect(cosmUI.slidingBoxes.close()).toEqual(false);
      expect(error).toEqual(true);
    
    });
    
    it("should do nothing and throw an error event if only one argument is passed",function(){
      
      var error = false;
      $('html').one('cosmui.error', function(event, data){
        error = true;
      });
      expect(cosmUI.slidingBoxes.close($('a').first())).toEqual(false);
      expect(error).toEqual(true);
    
    });
    
    it("should close the box",function(){
      
      var $toggle = $('a.circle.active').first(),
          $target = $toggle.next();
          
      expect($target).toHaveClass('open');
      cosmUI.slidingBoxes.close($toggle,$target);      
      expect($target).not.toHaveClass('open');    
      expect($toggle).not.toHaveClass('active');
    
    });
    
  });

  describe("open", function() {
    
    it("should do nothing and throw an error event if no arguments are passed",function(){
      
      var error = false;
      $('html').one('cosmui.error', function(event, data){
        error = true;
      });
      expect(cosmUI.slidingBoxes.open()).toEqual(false);
      expect(error).toEqual(true);
    
    });
    
    it("should do nothing and throw an error event if only one argument is passed",function(){
      
      var error = false;
      $('html').one('cosmui.error', function(event, data){
        error = true;
      });
      expect(cosmUI.slidingBoxes.open($('a').first())).toEqual(false);
      expect(error).toEqual(true);
    
    });
    
    it("should open the box",function(){
      
      var $toggle = $('a.circle').not('.active').first(),
          $target = $toggle.next();
          
      expect($target).not.toHaveClass('open');
      cosmUI.slidingBoxes.open($toggle,$target);      
      expect($target).toHaveClass('open');
      expect($toggle).toHaveClass('active');
    
    });
    
  });

  describe("closeAll", function() {
    
    it("should close any open box",function(){
      
      var $toggle = $('a.circle.active').first(),
          $target = $toggle.next();
          
      expect($target).toHaveClass('open');
      cosmUI.slidingBoxes.closeAll();
      expect($target).not.toHaveClass('open');
      expect($toggle).not.toHaveClass('active');
    
    });
    
  });

  describe("toggle", function() {
    
    it("should open a box if it is closed",function(){
      
      var $toggle = $('a.circle').not('.active').first(),
          $target = $toggle.next();
          
      expect($target).not.toHaveClass('open');
      $toggle.trigger('click.cosmui.sliding-boxes');      
      expect($target).toHaveClass('open');
      expect($toggle).toHaveClass('active');
    
    });
    
    it("should close a box if it is open",function(){
      
      var $toggle = $('a.circle.active').first(),
          $target = $toggle.next();
          
      expect($target).toHaveClass('open');
      $toggle.trigger('click.cosmui.sliding-boxes');      
      expect($target).not.toHaveClass('open');
      expect($toggle).not.toHaveClass('active');
    
    });
    
  });

  describe("global", function() {
    
    it("should close any box when Esc is pressed",function(){
      
      var $toggle = $('a.circle.active').first(),
          $target = $toggle.next(),
          $e = $.Event("keyup.cosmui");
      $e.keyCode = 27; // Esc key value;
          
      expect($target).toHaveClass('open');
      $('html').trigger($e);
      expect($target).not.toHaveClass('open');
      expect($toggle).not.toHaveClass('active');
    
    });
    
    it("should close any box when user clicks outside of a box",function(){
      
      var $toggle = $('a.circle.active').first(),
          $target = $toggle.next();
          
      expect($target).toHaveClass('open');
      $('body').trigger('click.cosmui.sliding-boxes');
      expect($target).not.toHaveClass('open');
      expect($toggle).not.toHaveClass('active');
    
    });
    
  });
  
});