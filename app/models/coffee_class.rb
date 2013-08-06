class CoffeeClass < CouchRest::Model::Base
  property :scheduled_at, Time
  property :free, TrueClass, :default => true

  timestamps!

  design do
    view :by_scheduled_at, :descending => true
  end
end
