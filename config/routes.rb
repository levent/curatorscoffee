CuratorscoffeeCom::Application.routes.draw do
  get '/design' => 'home#design'
  get '/creations' => 'home#creations'
  get '/food_drink' => 'home#food_and_drink'
  get '/catering' => 'home#catering'
  resources :classes, only: ['index']
  get '/loaderio-6459a9c1257bafee295d3ea05082da3a' => 'home#loaderio'
  root :to => 'home#index'
end
