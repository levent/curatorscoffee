describe("Global", function() {

  beforeEach(function() {
    loadFixtures('global.fixture.html');
    cosmUI.reload();
    cosmUI.disableAnimations();
    cosmUI.cookie.erase('cosmui.usermenu.state');
    $('#user-nav').addClass('closed').css('display','none');
  });

  describe("userMenu()", function() {
    
    it("Should do nothing if user menu is not enabled in settings",function(){
      cosmUI.settings.userMenu.enabled = false;
      expect( cosmUI.userMenu() ).toBe(false);
      cosmUI.settings.userMenu.enabled = true;
    });
    
    it("Should do nothing if it's the feed page",function(){
      $('<div/>', { 'class': 'feed-metadata' }).appendTo('#global');
      expect( cosmUI.userMenu() ).toBe(false);
    });
    
    xit("Should use default state from the settings if no state can be retrieved from the cookie",function(){
      cosmUI.cookie.erase('cosmui.usermenu.state');
      expect( cosmUI.cookie.read('cosmui.usermenu.state') ).toBe( null );
      expect( cosmUI.userMenu() ).toBe( cosmUI.settings.userMenu.open );
    });
    
    xit("Should set a cookie with the default state from the settings if there is no cookie yet",function(){
      cosmUI.cookie.erase('cosmui.usermenu.state');
      expect( cosmUI.cookie.read('cosmui.usermenu.state') ).toBe( null );
      cosmUI.userMenu();
      expect( cosmUI.cookie.read('cosmui.usermenu.state') ).toBe( ''+ cosmUI.settings.userMenu.open );
    });
    
    xit("Should open the menu if there is a cookie with state open",function(){
      var $target = $('#user-nav');
      cosmUI.cookie.create('cosmui.usermenu.state', true, 31);
      expect( $target ).not.toBeVisible();
      expect( $target ).toHaveClass( 'closed' );
      cosmUI.userMenu();
      expect( $target ).toBeVisible();
      expect( $target ).not.toHaveClass( 'closed' );
    });
    
    it("Should not open the menu if there is a cookie with state closed",function(){
      var $target = $('#user-nav');
      cosmUI.cookie.create('cosmui.usermenu.state', false, 31);
      expect( $target ).not.toBeVisible();
      expect( $target ).toHaveClass( 'closed' );
      cosmUI.userMenu();
      expect( $target ).not.toBeVisible();
      expect( $target ).toHaveClass( 'closed' );
    });
    
    xit("Should set the cookie state to closed when the menu is closed",function(){
      var $target = $('#user-nav');
      cosmUI.cookie.create('cosmui.usermenu.state', true, 31);
      expect( cosmUI.cookie.read('cosmui.usermenu.state') ).toBe( 'true' );
      $target.removeClass('closed').css('display','block');
      expect( $target ).toBeVisible();
      expect( $target ).not.toHaveClass( 'closed' );
      cosmUI.toggler.close( $target );
      expect( $target ).not.toBeVisible();
      expect( $target ).toHaveClass( 'closed' );
      expect( cosmUI.cookie.read('cosmui.usermenu.state') ).toBe( 'false' );
    });
    
    xit("Should set the cookie state to open when the menu is open",function(){
      var $target = $('#user-nav');
      cosmUI.cookie.create('cosmui.usermenu.state', false, 31);
      expect( cosmUI.cookie.read('cosmui.usermenu.state') ).toBe( 'false' );
      expect( $target ).not.toBeVisible();
      expect( $target ).toHaveClass( 'closed' );
      cosmUI.toggler.open( $target );
      expect( $target ).toBeVisible();
      expect( $target ).not.toHaveClass( 'closed' );
      expect( cosmUI.cookie.read('cosmui.usermenu.state') ).toBe( 'true' );
    });
    
  });

  describe("autoselect()", function() {
    
    it("Should make contents selected when element is focused",function(){
      var target = document.getElementById('autoselect-test'),
          $target = $( target ),
          getSelText = function ( ) {
            var startPos = target.selectionStart;
            var endPos = target.selectionEnd;
            return target.value.substring(startPos, endPos);
          };      
      expect( getSelText() ).toBe( '' );
      $target.focus();
      waits(110);
      runs(function () {
        expect( getSelText() ).toBe( $target.val() );
      });          
    });
    
  });

  describe("polyfill.placeholder()", function() {

    beforeEach(function () {
      Modernizr.input.placeholder = false;
    });
    
    it("Should run if the browser does not support HTML5 placeholders",function(){
      var spy = spyOn(cosmUI.polyfill, 'placeholder').andCallThrough();
      cosmUI.reload();
      expect( spy ).toHaveBeenCalled();
    });
    
    it("Should not run if the browser does support HTML5 placeholders",function(){
      var spy = spyOn(cosmUI.polyfill, 'placeholder').andCallThrough();
      Modernizr.input.placeholder = true;
      cosmUI.reload();
      expect( spy ).not.toHaveBeenCalled();
    });
    
    it("Should add a placeholder fallback element to inputs with attribute placeholder",function(){
      var $target = $('#placeholder-test');
      expect( $target.next('.placeholder').length ).toEqual(0);
      cosmUI.reload();
      expect( $target.next('.placeholder').length ).toEqual(1);
    });
    
    it("Should add a placeholder fallback element with the same text as specified in the placeholder attribute",function(){
      var $target = $('#placeholder-test');
      cosmUI.reload();
      expect( $target.next('.placeholder').text() ).toBe( $target.attr('placeholder') );
    });
    
    it("Should hide placeholder fallback element when the input is focused",function(){
      var $target = $('#placeholder-test'),
          $placeholder;
      cosmUI.reload();
      $placeholder = $target.next('.placeholder');
      expect( $placeholder ).toBeVisible();
      $target.focus();
      expect( $placeholder ).not.toBeVisible();
    });
    
    it("Should hide placeholder fallback element when clicked on (itself)",function(){
      var $target = $('#placeholder-test'),
          $placeholder;
      cosmUI.reload();
      $placeholder = $target.next('.placeholder');
      expect( $placeholder ).toBeVisible();
      $placeholder.click();
      expect( $placeholder ).not.toBeVisible();
    });
    
    it("Should show placeholder fallback element when the input loses focus",function(){
      var $target = $('#placeholder-test'),
          $placeholder;
      cosmUI.reload();
      $placeholder = $target.next('.placeholder');
      $target.focus();
      expect( $placeholder ).not.toBeVisible();
      $target.blur();
      expect( $placeholder ).toBeVisible();
    });
    
  });
  
});