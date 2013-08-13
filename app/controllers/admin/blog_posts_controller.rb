class Admin::BlogPostsController < AdminController
  def index
    @blog_posts = CouchPotato.database.view BlogPost.all
  end

  def new
    @blog_post = BlogPost.new
  end

  def create
    @blog_post = BlogPost.new(blog_post_params)
    if CouchPotato.database.save_document(@blog_post)
      redirect_to admin_blog_posts_path
    else
      render :new
    end
  end

  def edit
    @blog_post = CouchPotato.database.load_document(params[:id])
  end

  def update
    @blog_post = CouchPotato.database.load_document(params[:id])
    @blog_post.published_at = blog_post_params[:published_at]
    @blog_post.title = blog_post_params[:title]
    @blog_post.body = blog_post_params[:body]
    if CouchPotato.database.save_document(@blog_post)
      redirect_to admin_blog_posts_path
    else
      render :edit
    end
  end

  def show
    @blog_post = CouchPotato.database.view(BlogPost.by_slug(params[:id])).first
  end

  private

  def blog_post_params
    params.require(:blog_post).permit(:published_at, :title, :body)
  end
end
