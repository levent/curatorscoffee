class Admin::BrewClassesController < AdminController
  def new
    @brew_class = BrewClass.new
  end

  def create
    @brew_class = BrewClass.new(brew_class_params)
    if CouchPotato.database.save_document(@brew_class)
      Rails.cache.delete 'brew_classes'
      redirect_to admin_classes_path
    else
      render :new
    end
  end

  def edit
    @brew_class = CouchPotato.database.load_document(params[:id])
  end

  def update
    @brew_class = CouchPotato.database.load_document(params[:id])
    @brew_class.scheduled_at = brew_class_params[:scheduled_at]
    @brew_class.free = brew_class_params[:free]
    if CouchPotato.database.save_document(@brew_class)
      Rails.cache.delete 'brew_classes'
      redirect_to admin_classes_path
    else
      render :edit
    end
  end

  def destroy
    @brew_class = CouchPotato.database.load_document(params[:id])
    CouchPotato.database.destroy_document @brew_class
    Rails.cache.delete 'brew_classes'
    redirect_to admin_classes_path
  end

  private

  def brew_class_params
    params.require(:brew_class).permit(:scheduled_at, :free)
  end
end
