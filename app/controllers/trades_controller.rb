class TradesController < ApplicationController
    
    # Grabs a list of trades based on current user and stock
    # GET http://localhost:3000/trades?portfolio=default&stock=AAPL
    def index
        #Assigns Users if there is no current user
        if current_user
            @portfolio = current_user.portfolios.find_by(name: params[:portfolio])
            @stock = @portfolio.stocks.find_by(symbol: params[:stock])
            @trades = @stock.trades.all
            render json: @trades
        else
            # @user = User.first
            # @portfolio = @user.portfolios.find_by(name: params[:portfolio])
            render json: []
        end
    end
    
    # Creates a trade based on stock and portfolio information
    # POST http://localhost:3000/trades?portfolio=default&stock=AAPL, trade_params
    def create
        #Assigns user if there is no current user
        if current_user
            @portfolio = current_user.portfolios.find_by(name: params[:portfolio])
            @stock = @portfolio.stocks.find_by(symbol: params[:stock])
            @trade = @stock.trades.create(trade_params)
            render json: @trade
        else
            render json: []
        end
    end
    
    # Deletes a trade based on id, stock, and portfolio
    # DELETE http://localhost:3000/trades/#{id}?portfolio=default&stock=AAPL
    def destroy
      if current_user
        @portfolio = current_user.portfolios.find_by(name: params[:portfolio])
        @stock = @portfolio.stocks.find_by(symbol: params[:stock])
        @trade = @stock.trades.find(params[:id])
        @trade.destroy
      end
    end

    private
        
        # Parameters needed for creating a trade
        def trade_params
            params.require(:trade).permit(:action, :price, :quantity)
        end
end
