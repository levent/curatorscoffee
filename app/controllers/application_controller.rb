class ApplicationController < ActionController::Base
  protect_from_forgery

  before_filter :ensure_domain

  TheDomain = 'www.curatorscoffee.com'

  def ensure_domain
    if request.env['HTTP_HOST'] != TheDomain && Rails.env == "production" && ENV['STAGING'] != 'yes'
      redirect_to "http://#{TheDomain}"
    end
  end
end
