class CoffeeClass
  include CouchPotato::Persistence
  property :scheduled_at, :type => Time
  property :available, :type => Fixnum, :default => 6
  validates_presence_of :scheduled_at

  view :all, :key => :scheduled_at
end
