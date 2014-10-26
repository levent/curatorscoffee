class Admin::TeaClassesController < AdminController
  def new
    @tea_class = TeaClass.new
  end

  def create
    @tea_class = TeaClass.new(tea_class_params)
    if CouchPotato.database.save_document(@tea_class)
      Rails.cache.delete 'tea_classes'
      redirect_to admin_classes_path
    else
      render :new
    end
  end

  def edit
    @tea_class = CouchPotato.database.load_document(params[:id])
  end

  def update
    @tea_class = CouchPotato.database.load_document(params[:id])
    @tea_class.scheduled_at = tea_class_params[:scheduled_at]
    @tea_class.available = tea_class_params[:available]
    if CouchPotato.database.save_document(@tea_class)
      Rails.cache.delete 'latte_classes'
      redirect_to admin_classes_path
    else
      render :edit
    end
  end

  def destroy
    @tea_class = CouchPotato.database.load_document(params[:id])
    CouchPotato.database.destroy_document @tea_class
    Rails.cache.delete 'tea_classes'
    redirect_to admin_classes_path
  end

  private

  def tea_class_params
    params.require(:tea_class).permit(:scheduled_at, :available)
  end
end
