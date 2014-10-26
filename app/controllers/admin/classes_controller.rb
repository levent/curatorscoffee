class Admin::ClassesController < AdminController
  def index
    @brew_classes = CouchPotato.database.view BrewClass.all
    @latte_classes = CouchPotato.database.view LatteArtClass.all
    @tea_classes = CouchPotato.database.view TeaClass.all
  end

end
