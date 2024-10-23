class FoldersController < ApplicationController
  before_action :set_folder!, only: [ :edit, :update]

  def index
    @folders  = Folder.order created_at: :desc
  end

  def create
    @folder = Folder.new folder_params
    if @folder.save

    else
      render :new
    end
  end

  def new
    @folder = Folder.new
  end
  def edit;
  end

  def update
    if @folder.update folder_params
      redirect_to folders_path
    else
      render :edit
    end
  end

  private

  def set_folder!
    @folder = Folder.find params[:id]
  end
  def folder_params
    params.require(:folder).permit(:title, :description)
  end

end