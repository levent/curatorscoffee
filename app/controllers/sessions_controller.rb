class SessionsController < ApplicationController
  def create
    user = (CouchPotato.database.view User.by_email(params[:email])).first
    if user.try(:authenticate, params[:password])
      session[:user_id] = user.id
      redirect_to admin_classes_path
    else
      session[:user_id] = nil
      render :new
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end

end
