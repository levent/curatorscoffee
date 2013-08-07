class ClassesController < ApplicationController
  def index
    @brew_classes = Rails.cache.read('brew_classes')
    @latte_classes = Rails.cache.read('latte_classes')
    unless @brew_classes
      @brew_classes = CouchPotato.database.view BrewClass.all(:key => (1.week.ago)..(1.year.from_now))
      Rails.cache.write('brew_classes', @brew_classes, :expires_in => 3600)
    end
    unless @latte_classes
      @latte_classes = CouchPotato.database.view LatteArtClass.all(:key => (1.week.ago)..(1.year.from_now))
      Rails.cache.write('latte_classes', @latte_classes, :expires_in => 3600)
    end
  end
end
