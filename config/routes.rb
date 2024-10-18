Rails.application.routes.draw do

  namespace :api do
    resources :images, only: :update
  end

  resources :folders
 root "layouts#index"
end
