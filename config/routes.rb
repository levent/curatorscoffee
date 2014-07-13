CuratorscoffeeCom::Application.routes.draw do
  resources :sessions, :only => [:create]
  namespace :admin do
    root :to => redirect('/admin/classes')
    resources :classes, :only => [:index]
    resources :documents
    resources :brew_classes
    resources :latte_art_classes
    resources :blog_posts
  end

  resources :blog, :only => [:index, :show]
  get '/list/join', to: 'mailing_list#join'
  get '/list/wait', to: 'mailing_list#wait'
  get '/posts/:id', to: redirect('/blog/%{id}')

  get '/login' => 'sessions#new'
  get '/logout' => 'sessions#destroy'
  get '/design' => 'home#design'
  get '/creations' => 'home#creations'
  get '/food_drink' => 'home#food_and_drink'
  get '/catering' => 'home#catering'
  get '/locations' => 'home#locations'
  resources :classes, only: ['index']
  get '/loaderio-6459a9c1257bafee295d3ea05082da3a' => 'home#loaderio'
  root :to => 'home#index'
end
