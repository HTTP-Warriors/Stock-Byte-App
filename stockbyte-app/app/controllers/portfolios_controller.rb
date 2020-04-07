class PortfoliosController < ApplicationController
    def index
      @user = current_user
      @portfolio = @user.portfolios.all
      render json: @portfolio
    end

    def create
    end
end
