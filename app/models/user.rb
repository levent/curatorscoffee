class User
  extend ActiveModel::SecurePassword::ClassMethods
  include CouchPotato::Persistence
  property :email
  property :password_digest

  has_secure_password
  view :by_email, :key => :email
  # (CouchPotato.database.view User.by_email('lebreeze@gmail.com')).first.authenticate('abcd')
end
