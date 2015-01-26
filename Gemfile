source 'https://rubygems.org'
ruby "2.1.2"

gem 'rails', '4.1.9'
gem 'sass-rails', '~> 4.0.3'
gem 'coffee-rails', '~> 4.0.0'
gem 'turbolinks'
gem 'spring',        group: :development

gem 'newrelic_rpm'

gem 'actionpack-action_caching'
gem 'memcachier'
gem 'dalli'

gem 'compass-rails'
gem 'compass'
gem 'foundation-rails', '5.4.5.0'

gem 'uglifier', '>= 2.1.1'

gem 'rack-cors', :require => 'rack/cors'
gem 'rollbar', '~> 1.2.4'

group :development do
  gem 'brakeman', :require => false
  gem 'dotenv-rails'
  gem 'rails_best_practices'
  gem 'cane'
end

group :production do
  gem 'rails_12factor'
  gem 'heroku-deflater'
  gem 'unicorn'
  gem 'rack-timeout'
end
