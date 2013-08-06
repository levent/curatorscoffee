class ClassesController < ApplicationController
  def index
    @brew_classes = BrewClass.by_scheduled_at.startkey(1.week.ago).rows
    @latte_classes = LatteArtClass.by_scheduled_at.startkey(1.week.ago).rows
  end
end
