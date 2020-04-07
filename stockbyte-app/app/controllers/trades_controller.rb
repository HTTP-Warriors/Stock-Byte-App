class TradesController < ApplicationController
    # use http://localhost:3000/trades?portfolio={portfolio name}&stock={stock symbol}
    # e.g: http://localhost:3000/trades?portfolio=default&stock=AAPL
    def index
        @portfolio = current_user.portfolios.find_by(name: params[:portfolio])
        @stock = @portfolio.stocks.find_by(symbol: params[:stock])
        @trades = @stock.trades.all
        render json: @trades
    end

    def create
    end
end
