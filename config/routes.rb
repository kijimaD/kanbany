Rails.application.routes.draw do
  resources :statics
  root 'statics#index'

  get '/develop', to: 'statics#develop'

  namespace :api, format: 'json' do
    namespace :v1 do
      resources :columns
      resources :tasks
    end
  end
end
