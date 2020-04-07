class StocksController < ApplicationController
  # http://localhost:3000/stocks?portfolio=default
  def index
    @portfolio = current_user.portfolios.find_by(name: params[:portfolio])
    @stocks=@portfolio.stocks.all
    render json: @stocks
  end

  def show
    @portfolio = current_user.portfolios.find_by(name: params[:portfolio])
    @stock=@portfolio.stocks.find(params[:id])
    render json: @stock
  end
end
