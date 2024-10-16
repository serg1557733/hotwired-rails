module Api
  class ImagesController < ApplicationController
    def update
        @image = Image.find params[:id]
        @image.update! title: params[:image][:title].strip
    end
  end
end