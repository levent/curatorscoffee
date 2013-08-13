class BlogPost
  include CouchPotato::Persistence
  property :title
  property :body
  property :slug
  property :published_at, :type => Time
  validates_presence_of :title
  validates_presence_of :body

  before_create :create_slug

  view :all, :key => :published_at
  view :by_slug, :key => :slug

  def create_slug
    self.slug = "#{Date.today.to_s}-#{self.title}".to_slug.to_ascii.normalize.to_s
  end
end
