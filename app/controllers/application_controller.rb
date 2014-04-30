class ApplicationController < ActionController::Base
  protect_from_forgery

  before_filter :ensure_domain

  TheDomain = 'www.curatorscoffee.com'

  def ensure_domain
    if request.env['HTTP_HOST'] != TheDomain && Rails.env == "production" && ENV['STAGING'] != 'yes'
      redirect_to "http://#{TheDomain}"
    end
  end

  private

  def current_user
    @current_user ||= CouchPotato.database.load_document(session[:user_id]) if session[:user_id]
  end

  def login_required
    redirect_to logout_path unless current_user
  end
end
