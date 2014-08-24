class HomeController < ApplicationController
  before_filter :set_map_urls
  caches_action :index, expires_in: 10.minutes
  caches_action :locations, expires_in: 10.minutes
  caches_action :design, expires_in: 10.minutes
  caches_action :creations, expires_in: 10.minutes
  caches_action :food_and_drink, expires_in: 10.minutes

  def index
  end

  def design
  end

  def creations
  end

  def food_and_drink
  end

  def classes
  end

  def locations
  end

  private

  def set_map_urls
    @studio_map_url = "https://goo.gl/maps/bZdoz"
    @gallery_map_url = "https://goo.gl/maps/MPDSv"
  end

end
