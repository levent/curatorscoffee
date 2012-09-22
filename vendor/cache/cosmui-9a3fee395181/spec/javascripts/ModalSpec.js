describe("Modal", function() {

  beforeEach(function() {
    loadFixtures('modal.fixture.html');
    cosmUI.modal.reload();
    cosmUI.settings.animation.enabled = false;
  });

  describe("open", function() {
    
    it("should open a modal with the id that's in the href of the toggle",function(){
      
      var $toggle = $('[data-cosmui*="modal"]').filter('[href*="#"]'),
          $modal = $($toggle.attr('href'));
      
      expect($modal).not.toHaveClass('open');
      $toggle.trigger('click.cosmui.modal');
      expect($modal).toHaveClass('open');
      expect($modal).toBeVisible();
    });
    
    it("should open a modal that matches the selector that's in the data-target of the toggle",function(){
      
      var $toggle = $('[data-cosmui*="modal"]').filter('[data-target]'),
          $modal = $($toggle.attr('data-target')); 
      
      expect($modal).not.toHaveClass('open');
      $toggle.trigger('click.cosmui.modal');
      expect($modal).toHaveClass('open');
      expect($modal).toBeVisible();   
    });
    
    it("should open a modal that is passed as an argument",function(){
      
      var $modal = $('#sample-modal'); 
      
      expect($modal).not.toHaveClass('open');
      cosmUI.modal.open($modal);
      expect($modal).toHaveClass('open');
      expect($modal).toBeVisible();
    });
    
    it("should not open an element that is not a modal",function(){
      
      var $notamodal = $('#fake-modal'); 
      
      expect($notamodal).not.toHaveClass('open');
      cosmUI.modal.open($notamodal);
      expect($notamodal).not.toHaveClass('open');
    });
    
    it("should display a backdrop which prevents clicks outside of modal and keep it open",function(){
      
      var $modal = $('#sample-modal'),
          $backdrop; 
      
      cosmUI.modal.open($modal);
      $backdrop = $('.modal-backdrop');
      expect($backdrop).toBeVisible();
      expect($modal).toHaveClass('open');
      $backdrop.click();
      expect($modal).toHaveClass('open');
    });
    
    it("should keep modal open if called",function(){
      
      var $modal = $('#sample-modal'); 
      
      expect($modal).not.toHaveClass('open');
      cosmUI.modal.open($modal);
      expect($modal).toHaveClass('open');
      expect($modal).toBeVisible();
      cosmUI.modal.open($modal);
      expect($modal).toHaveClass('open');
      expect($modal).toBeVisible();
    });
      
  });

  describe("close", function() {
    
    it("should close the modal",function(){
      
      var $modal = $('#sample-modal'); 
      
      cosmUI.modal.open($modal);
      expect($modal).toHaveClass('open');
      cosmUI.modal.close($modal);
      expect($modal).not.toHaveClass('open');
      expect($modal).not.toBeVisible();
    });
    
    it("should close any modal in the absence of arguments",function(){
      
      var $modal = $('#sample-modal');
      
      cosmUI.modal.open($modal);
      expect($modal).toHaveClass('open');
      cosmUI.modal.close();
      expect($modal).not.toHaveClass('open');
    });
    
    it("should remove backdrop from DOM",function(){
      
      var $modal = $('#sample-modal'),
          $backdrop;
      
      cosmUI.modal.open($modal);
      $backdrop = $('.modal-backdrop');
      cosmUI.modal.close();
      expect($backdrop.parent().length).toEqual(0); // all DOM nodes have parents, if they don't it's because they're going to be alive as long as there are references
    });
    
    it("should close the parent modal if containing close buttons are clicked",function(){
      
      var $modal = $('#sample-modal'); 
      
      cosmUI.modal.open($modal);
      expect($modal).toHaveClass('open');
      $('[data-close="modal"]',$modal).first().click();
      expect($modal).not.toHaveClass('open');
      expect($modal).not.toBeVisible();
      
      cosmUI.modal.open($modal);
      expect($modal).toHaveClass('open');
      $('.close',$modal).first().click();
      expect($modal).not.toHaveClass('open');
      expect($modal).not.toBeVisible();
    });
    
    it("should close the modal when escape key is pressed",function(){
      
      var $modal = $('#sample-modal'),
          $e = $.Event("keyup");
      $e.keyCode = 27; // Esc key value
      
      cosmUI.modal.open($modal);
      expect($modal).toHaveClass('open');
      $('html').trigger($e);
      expect($modal).not.toHaveClass('open');
      expect($modal).not.toBeVisible();
    });
    
  });
  
});

