class Admin::LatteArtClassesController < ApplicationController
  def new
    @latte_art_class = LatteArtClass.new
  end

  def create
    @latte_art_class = LatteArtClass.new(latte_art_class_params)
    if CouchPotato.database.save_document(@latte_art_class)
      redirect_to admin_classes_path
    else
      render :new
    end
  end

  def edit
    @latte_art_class = CouchPotato.database.load_document(params[:id])
  end

  def update
    @latte_art_class = CouchPotato.database.load_document(params[:id])
    @latte_art_class.scheduled_at = latte_art_class_params[:scheduled_at]
    @latte_art_class.free = latte_art_class_params[:free]
    if CouchPotato.database.save_document(@latte_art_class)
      redirect_to admin_classes_path
    else
      render :edit
    end
  end

  def destroy
    @brew_class = CouchPotato.database.load_document(params[:id])
    CouchPotato.database.destroy_document @brew_class
    redirect_to admin_classes_path
  end

  private

  def latte_art_class_params
    params.require(:latte_art_class).permit(:scheduled_at, :free)
  end
end
