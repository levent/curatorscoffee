class HomeController < ApplicationController
  before_filter :set_cache_control
  before_filter :set_map_url

  def index
  end

  def design
  end

  def creations
  end

  def contact_us
  end

  def food_and_drink
  end

  def classes
  end

  private

  def set_cache_control
    response.headers['Cache-Control'] = 'public, max-age=2592000'
  end

  def set_map_url
    @map_url = "http://maps.google.co.uk/maps?q=curators+coffee&amp;hl=en&amp;ll=51.512108,-0.082591&amp;spn=0.016279,0.036736&amp;sll=53.800651,-4.064941&amp;sspn=31.939111,75.234375&amp;hq=curators+coffee&amp;t=m&amp;z=16&amp;iwloc=A"
  end

end
