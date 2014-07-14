class Admin::DocumentsController < AdminController
  def index
    @documents = CouchPotato.database.view(Document.by_title)
  end

  def new
    @document = Document.new
  end

  def create
    @document = Document.new(document_params)
    if CouchPotato.database.save_document(@document)
      redirect_to admin_documents_path
    else
      render :new
    end
  end

  private

  def document_params
    params.require(:document).permit(:title, :body)
  end
end
