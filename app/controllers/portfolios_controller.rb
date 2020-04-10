class PortfoliosController < ApplicationController
  # GET http://localhost:3000/portfolios
    def index
      if current_user
        @portfolio = current_user.portfolios.all
        render json: @portfolio
      else
      #   @user = User.first
      #   @portfolio = @user.portfolios.all
      render json: []
      end
    end
  # POST http://localhost:3000/portfolios, portfolio_params
    def create
      if current_user
        @portfolio = current_user.portfolios.create(portfolio_params)
        render json: @portfolio
      else
        # @user = User.first
        # @portfolio = @user.portfolios.create(portfolio_params)
      render json: []
      end
    end

private
    def portfolio_params
      params.require(:portfolio).permit(:name)
    end
end
