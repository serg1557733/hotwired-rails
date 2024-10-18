class FoldersController < ApplicationController
  before_action :set_folder!, only: [ :edit, :update]
  def index
    @folders  = Folder.order created_at: :desc
  end

  def edit

  end

  def update

  end

  private

  def set_folder!
    @folder = Folder.find params[:id]
  end


end