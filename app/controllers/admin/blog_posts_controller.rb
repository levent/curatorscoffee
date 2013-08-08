class Admin::BlogPostsController < AdminController
  def index
    @blog_posts = CouchPotato.database.view BlogPost.all
  end
end
