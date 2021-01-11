Rails.application.routes.draw do
  resources :statics
  root 'statics#index'

  get '/develop', to: 'statics#develop'

  namespace :api, format: 'json' do
    namespace :v1 do
      get 'columns/:user_id', to: 'columns#index' # temporary
      resources :columns
      resources :tasks
    end
  end
end
