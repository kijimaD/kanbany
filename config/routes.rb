Rails.application.routes.draw do
  resources :statics
  root 'statics#index'
end
