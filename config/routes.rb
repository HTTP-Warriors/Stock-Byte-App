Rails.application.routes.draw do
  resources :trades
  resources :stocks
  resources :portfolios
  devise_for :users
  get '*path', to: 'home#root', constraints: ->(request){ request.format.html? }
  root to: 'home#root'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  
end
