class PortfoliosController < ApplicationController
  # GET http://localhost:3000/portfolios
    def index
      if current_user
        @portfolio = current_user.portfolios.all
      else
        @user = User.first
        @portfolio = @user.portfolios.all
      end
      render json: @portfolio
    end
  # POST http://localhost:3000/portfolios, portfolio_params
    def create
      if current_user
        @portfolio = current_user.portfolios.create(portfolio_params)
      else
        @user = User.first
        @portfolio = @user.portfolios.create(portfolio_params)
      end
      render json: @portfolio
    end

private
    def portfolio_params
      params.require(:portfolio).permit(:name)
    end
end
