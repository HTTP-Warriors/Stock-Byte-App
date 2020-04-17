class PortfoliosController < ApplicationController

  # Returns a render json based on their portfolio else renders not signed in
  # GET http://localhost:3000/portfolios
  def index
    if current_user
      @portfolios = current_user.portfolios.all
      render json: @portfolios
    else
      render json: ["not signed in"]
    end
  end

  # Creates a porfolio for current user and returns as json
  # POST http://localhost:3000/portfolios, portfolio_params
  def create
    if current_user
      @portfolio = current_user.portfolios.create(portfolio_params)
      render json: @portfolio
    else
      render json: []
    end
  end

  # Updates information of current users portfolio based on params
  # PUT http://localhost:3000/portfolios/id
  def update
    if current_user
      @portfolio = current_user.portfolios.find(params[:id])
      @portfolio.update_attributes(portfolio_params)
      render json: @portfolio
    end
  end

  def leaderboard
    @all_playgrounds = Portfolio.where(name: "playground")
    @playgroundBoard = []
    @all_playgrounds.each do |account|
      @nick_name = User.find(account.user_id).nick_name
      @cash = account.cash
      @stock_list = account.stocks.all.select do |stock|
        stock.total_quantity > 0
      end
      @playgroundBoard<<{ nick_name: @nick_name, cash: @cash, stock_list: @stock_list}
    end
    render json: @playgroundBoard
  end

  #Defining portfolio params
  private
    def portfolio_params
      params.require(:portfolio).permit(:name, :cash)
    end

end
