class StocksController < ApplicationController
      
  # Returns all stock information based on portfolio user by user
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
  
  # Show a user a specific stock based on ID
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

  # Create a stock based on stock paramas and portfolio information
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
  
  # Delete a stock based on id and portfolio passed on by params
  # DELETE http://localhost:3000/stocks/${id}?portfolio=default
  def destroy
    if current_user
      @portfolio = current_user.portfolios.find_by(name: params[:portfolio])
      @stock=@portfolio.stocks.find(params[:id])
      @stock.destroy
    end
  end

  private
    
    # Defining stock paramaeters 
    def stock_params
      params.require(:stock).permit(:symbol)
    end
end
