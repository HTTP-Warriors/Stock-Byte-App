class TradesController < ApplicationController
    # use http://localhost:3000/trades?portfolio=${portfolio name}&stock=${stock symbol}
    # e.g: http://localhost:3000/trades?portfolio=default&stock=AAPL
    def index
        #Assigns Users if there is no current user
        if current_user
            @portfolio = current_user.portfolios.find_by(name: params[:portfolio])
        else
            @user = User.first
            @portfolio = @user.portfolios.find_by(name: params[:portfolio])
        end

        @stock = @portfolio.stocks.find_by(symbol: params[:stock])
        @trades = @stock.trades.all
        render json: @trades

    end

    def create
        #Assigns user if there is no current user
        if current_user
            @portfolio = current_user.portfolios.find_by(name: params[:portfolio])
        else
            @user = User.first
            @portfolio = @user.portfolios.find_by(name: params[:portfolio])
        end

        @stock = @portfolio.stocks.find_by(symbol: params[:stock])
        @trade = @stock.trades.create(trade_params)

        render json: @trade
    end
    # DELETE http://localhost:3000/trades/#{id}?portfolio=default&stock=AAPL
    def destroy
      if current_user
        @portfolio = current_user.portfolios.find_by(name: params[:portfolio])
      else
        @user = User.first
        @portfolio = @user.portfolios.find_by(name: params[:portfolio])
      end
      @stock = @portfolio.stocks.find_by(symbol: params[:stock])
      @trade = @stock.trades.find(params[:id])
      @trade.destroy
    end


private
    def trade_params
        params.require(:trade).permit(:action, :price, :quantity)
    end
end
