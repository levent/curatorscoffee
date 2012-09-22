describe("Dropdown", function() {

  beforeEach(function() {
    loadFixtures('dropdown.fixture.html');
    cosmUI.dropdown.reload();
  });

  describe("global", function() {
    
    it("should open a dropdown menu with the id that is in the href of the toggle",function(){
      
      var id = "#dropdown1";
      expect( $(id) ).not.toHaveClass("open");   
      $('.dropdown-toggle[href="'+ id +'"]').trigger('click.cosmui.dropdown');
      expect( $(id) ).toHaveClass("open");     
      
    });
    
    it("should open a dropdown menu with the selector that is in the data-target of the toggle",function(){
    
      var $el = $("#dropdown-toggle2"),
          selector = $el.attr('data-target');
      expect( $(selector) ).not.toHaveClass("open");
      $el.trigger('click.cosmui.dropdown');
      expect( $(selector) ).toHaveClass("open");
      
    });
    
    it("should use the next sibling element as dropdown menu when target is 'next'",function(){
    
      var $el = $("#dropdown-toggle3");
      expect( $el.next() ).not.toHaveClass("open");
      $el.trigger('click.cosmui.dropdown');
      expect( $el.next() ).toHaveClass("open");
      
    });
    
    it("should use the previous sibling element as dropdown menu when target is 'previous'",function(){
    
      var $el = $("#dropdown-toggle4");
      expect( $el.prev() ).not.toHaveClass("open");
      $el.trigger('click.cosmui.dropdown');
      expect( $el.prev() ).toHaveClass("open");
      
    });
    
    it("should close all other dropdowns before opening a new one",function(){
    
      var $el1 = $("#dropdown-toggle1"),
          $el2 = $("#dropdown-toggle3"),
          $menu1 = $el1.next(),
          $menu2 = $el2.next();
      $el2.trigger('click.cosmui.dropdown');
      expect( $menu1 ).not.toHaveClass("open");
      expect( $menu2 ).toHaveClass("open");
      $el1.trigger('click.cosmui.dropdown');
      expect( $menu1 ).toHaveClass("open");
      expect( $menu2 ).not.toHaveClass("open");     
      
    });
    
    it("should close the respective menu when the toggle is clicked and it is open",function(){
    
      var $el1 = $("#dropdown-toggle1"),
          $menu1 = $el1.next();
      $el1.trigger('click.cosmui.dropdown');
      expect( $menu1 ).toHaveClass("open");
      $el1.trigger('click.cosmui.dropdown');
      expect( $menu1 ).not.toHaveClass("open");
      
    });
    
    it("should close any open dropdown if there's a click outside of it",function(){
    
      var $el1 = $("#dropdown-toggle1"),
          $menu1 = $el1.next();
      $el1.trigger('click.cosmui.dropdown');
      expect( $menu1 ).toHaveClass("open");
      $('html').trigger('click.cosmui.dropdown');
      expect( $menu1 ).not.toHaveClass("open");
      
    });
    
  });
  
});