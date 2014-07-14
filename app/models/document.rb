class Document
  include CouchPotato::Persistence
  property :title, :type => String
  property :body
  validates_presence_of :title
  validates_presence_of :body

  view :by_title, :key => :title
end
