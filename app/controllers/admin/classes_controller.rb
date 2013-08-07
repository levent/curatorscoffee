class Admin::ClassesController < AdminController
  def index
    @brew_classes = CouchPotato.database.view BrewClass.all
    @latte_classes = CouchPotato.database.view LatteArtClass.all
  end

end
