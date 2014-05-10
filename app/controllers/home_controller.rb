class HomeController < ApplicationController
  before_filter :set_map_urls

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

  def loaderio
    render :layout => false
  end

  private

  def set_map_urls
    @studio_map_url = "https://goo.gl/maps/bZdoz"
    @gallery_map_url = "https://goo.gl/maps/MPDSv"
  end

end
