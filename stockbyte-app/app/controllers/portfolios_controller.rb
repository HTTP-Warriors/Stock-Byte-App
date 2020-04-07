class PortfoliosController < ApplicationController
    def index
      @user = current_user
      render json: @user
    end

    def create
    end
end
