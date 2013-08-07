class CoffeeClass
  include CouchPotato::Persistence
  property :scheduled_at, :type => Time
  property :free, :type => :boolean, :default => true
  validates_presence_of :scheduled_at

  view :all, :key => :scheduled_at
end
