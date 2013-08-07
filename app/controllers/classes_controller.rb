class ClassesController < ApplicationController
  def index
    @brew_classes = Rails.cache.read('brew_classes')
    @latte_classes = Rails.cache.read('latte_classes')
    unless @brew_classes
      @brew_classes = BrewClass.by_scheduled_at.startkey(1.week.ago).rows
      Rails.cache.write('brew_classes', @brew_classes)
    end
    unless @latte_classes
      @latte_classes = LatteArtClass.by_scheduled_at.startkey(1.week.ago).rows
      Rails.cache.write('latte_classes', @latte_classes)
    end
  end
end
