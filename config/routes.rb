Rails.application.routes.draw do
  resources :statics
  root 'statics#index'

  namespace :api, format: 'json' do
    namespace :v1 do
      resources :columns
    end
  end
end
