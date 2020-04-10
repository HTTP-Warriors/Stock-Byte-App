class StocksController < ApplicationController

  # GET http://localhost:3000/stocks?portfolio=default
  def index
    #Assigns user if there is no current user
    if current_user
      @portfolio = current_user.portfolios.find_by(name: params[:portfolio])
      @stocks=@portfolio.stocks.all
      render json: @stocks
    else
      # @user = User.first
      # @portfolio = @user.portfolios.find_by(name: params[:portfolio])
      render json:[]
    end
  end

  # GET http://localhost:3000/stocks/${id}?portfolio=default
  def show
    #Assigns user if there is no current user
    if current_user
      @portfolio = current_user.portfolios.find_by(name: params[:portfolio])
      @stock=@portfolio.stocks.find(params[:id])
      render json: @stock
    else
      # @user = User.first
      # @portfolio = @user.portfolios.find_by(name: params[:portfolio])
      render json: []
    end
  end

  # POST http://localhost:3000/stocks?portfolio=default, stock_params
  def create
    #Assigns user if there is no current user
    if current_user
      @portfolio = current_user.portfolios.find_by(name: params[:portfolio])
      @stock = @portfolio.stocks.create(stock_params)
      render json: @stock
    else
      # @user = User.first
      # @portfolio = @user.portfolios.find_by(name: params[:portfolio])
      render json: []
    end
  end
  # DELETE http://localhost:3000/stocks/${id}?portfolio=default
  def destroy
    if current_user
      @portfolio = current_user.portfolios.find_by(name: params[:portfolio])
      @stock=@portfolio.stocks.find(params[:id])
      @stock.destroy
      # @user = User.first
      # @portfolio = @user.portfolios.find_by(name: params[:portfolio])
    end
  end

private
  def stock_params
    params.require(:stock).permit(:symbol)
  end
end
