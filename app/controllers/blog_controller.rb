class BlogController < ApplicationController
  def index
    @blog_posts = CouchPotato.database.view BlogPost.all(key: (Time.now)..(10.years.ago), descending: true)
  end

  def show
    @blog_post = CouchPotato.database.view(BlogPost.by_slug(params[:id])).first
    redirect_to blog_path unless @blog_post.try(:published_at)
  end
end
