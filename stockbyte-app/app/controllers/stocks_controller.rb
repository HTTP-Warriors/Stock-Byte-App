class StocksController < ApplicationController

  # GET http://localhost:3000/stocks?portfolio=default
  def index
    #Assigns user if there is no current user
    if current_user
      @portfolio = current_user.portfolios.find_by(name: params[:portfolio])
    else
      @user = User.first
      @portfolio = @user.portfolios.find_by(name: params[:portfolio])
    end
    @stocks=@portfolio.stocks.all
    render json: @stocks
  end

  # GET http://localhost:3000/stocks/${id}?portfolio=default
  def show
    #Assigns user if there is no current user
    if current_user
      @portfolio = current_user.portfolios.find_by(name: params[:portfolio])
    else
      @user = User.first
      @portfolio = @user.portfolios.find_by(name: params[:portfolio])
    end
    @stock=@portfolio.stocks.find(params[:id])
    render json: @stock
  end

  # POST http://localhost:3000/stocks?portfolio=default
  def create
    #Assigns user if there is no current user
    if current_user
      @portfolio = current_user.portfolios.find_by(name: params[:portfolio])
    else
      @user = User.first
      @portfolio = @user.portfolios.find_by(name: params[:portfolio])
    end
    @stock = @portfolio.stocks.create(stock_params)
    render json: @stock
  end
  # DELETE http://localhost:3000/stocks/${id}?portfolio=default
  def destroy
    if current_user
      @portfolio = current_user.portfolios.find_by(name: params[:portfolio])
    else
      @user = User.first
      @portfolio = @user.portfolios.find_by(name: params[:portfolio])
    end
    @stock=@portfolio.stocks.find(params[:id])
    @stock.destroy
  end

private
  def stock_params
    params.require(:stock).permit(:symbol)
  end
end
