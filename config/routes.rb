CuratorscoffeeCom::Application.routes.draw do

  get '/list/join', to: 'mailing_list#join'
  get '/list/wait', to: 'mailing_list#wait'

  get '/design' => 'home#design'
  get '/creations' => 'home#creations'
  get '/food_drink' => 'home#food_and_drink'
  get '/catering' => 'home#catering'
  get '/locations' => 'home#locations'
  resources :classes, only: ['index']
  root :to => 'home#index'
end
