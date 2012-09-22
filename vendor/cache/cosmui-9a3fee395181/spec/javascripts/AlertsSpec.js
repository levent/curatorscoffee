describe("Alerts", function() {

  beforeEach(function() {
    loadFixtures('alerts.fixture.html');
    cosmUI.alert.reload();
  });

  describe("close()", function() {
    
    it("should close the alert when close button is clicked",function(){   
      
      var $el = $('#alert1');      
      cosmUI.settings.animation.enabled = false;
      expect($el).toBeVisible();
      $el.find('.close').click();
      expect($el).not.toBeVisible();
      expect($el.parent()).not.toExist();
            
    });
    
    it("should close the alert that is passed as an argument", function(){ 
      
      var $el = $('#alert1');      
      cosmUI.settings.animation.enabled = false;
      expect($el).toBeVisible();
      cosmUI.alert.close($el);
      expect($el).not.toBeVisible();
      expect($el.parent()).not.toExist();      
    
    });
    
    it("should do nothing if an element that is not a alert box is passed", function(){ 
      
      var $el = $('#alerts');
      cosmUI.settings.animation.enabled = false;
      expect($el).toBeVisible();
      cosmUI.alert.close($el);
      expect($el).toBeVisible();
      expect($el.parent()).toExist();        
    
    });
    
  });
  
});