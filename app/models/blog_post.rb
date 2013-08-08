class BlogPost
  include CouchPotato::Persistence
  property :title
  property :body
  property :published_at, :type => Time
  validates_presence_of :title
  validates_presence_of :body

  view :all, :key => :published_at
end
