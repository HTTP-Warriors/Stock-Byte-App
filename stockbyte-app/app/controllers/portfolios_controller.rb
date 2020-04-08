class PortfoliosController < ApplicationController
    def index
      if current_user
        @portfolio = current_user.portfolios.all
      else
        @user = User.first
        @portfolio = @user.portfolios.all
      end
      render json: @portfolio
    end

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
