describe("Tabs", function() {

  beforeEach(function() {
    loadFixtures('tabs.fixture.html');
  });

  describe("show()", function() {
    
    it("should do nothing if current tab is passed",function(){
    
      var $el = $('.tab-pane.active').first(),
          $addClass = spyOn($.fn, 'addClass').andCallThrough();
      cosmUI.tabs.show($el);
      expect( $el ).toHaveClass('active');
      expect( $addClass ).not.toHaveBeenCalledWith('active');
      
    });
    
    
    it("should do nothing if an element that's not a tab is passed",function(){
    
      var $el = $('p').not('.tab-pane').first(),
          $addClass = spyOn($.fn, 'addClass').andCallThrough();
      cosmUI.tabs.show($el);
      expect( $addClass ).not.toHaveBeenCalledWith('active');
      
    });
    
    
    it("should do nothing if a tab pane without a corresponding toggle is passed",function(){
    
      var $addClass = spyOn($.fn, 'addClass').andCallThrough();
      cosmUI.tabs.show( $('<section/>', { id: 'tab-faketab', class: 'tab-pane' }) );
      expect( $addClass ).not.toHaveBeenCalledWith('active');
      
    });
    
    
    it("should display supplied target tab",function(){
    
      var $el = $('.tab-pane').not('.active').first();
      expect( $el ).not.toHaveClass('active');
      cosmUI.tabs.show( $el );
      expect( $el ).toHaveClass('active');
      
    });  
    
    
    it("should activate supplied target tab's toggle",function(){
    
      var $toggle = $('.nav-tabs li').not('.active'),
          $el = $( $toggle.find('a').attr('href') );
      expect( $toggle ).not.toHaveClass('active');
      cosmUI.tabs.show( $el );
      expect( $toggle ).toHaveClass('active');
      
    }); 
    
    
    it("should hide current tab",function(){
    
      var $toggle = $('.nav-tabs li.active').first(),
          $el = $( $toggle.find('a').attr('href') );
      expect( $el ).toHaveClass('active');
      cosmUI.tabs.show( $('.tab-pane').not('.active').first() );
      expect( $el ).not.toHaveClass('active');
      
    });
    
    
    it("should de-activate current tab's toggle",function(){
    
      var $toggle = $('.nav-tabs li.active').first();
      expect( $toggle ).toHaveClass('active');
      cosmUI.tabs.show( $('.tab-pane').not('.active').first() );
      expect( $toggle ).not.toHaveClass('active');
      
    });
    
  });
  
});