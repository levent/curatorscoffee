if uri = URI.parse(ENV['CLOUDANT_URL'])
  CouchRest::Model::Base.configure do |config|
    config.connection = {
      :protocol => uri.scheme,
      :host     => uri.host,
      :port     => uri.port,
      :prefix   => 'curators', # database name or prefix
      :suffix   => Rails.env,
      :join     => '_',
      :username => uri.user,
      :password => uri.password
    }
  end
end
