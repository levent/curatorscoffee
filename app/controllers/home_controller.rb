class HomeController < ApplicationController
  def index
    response.headers['Cache-Control'] = 'public, max-age=2592000'
  end
end
