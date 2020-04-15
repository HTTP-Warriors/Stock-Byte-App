class PortfoliosController < ApplicationController

  # Returns a render json based on their portfolio else renders not signed in
  # GET http://localhost:3000/portfolios
  def index
    if current_user
      @portfolio = current_user.portfolios.all
      render json: @portfolio
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

  #Defining portfolio params
  private
    def portfolio_params
      params.require(:portfolio).permit(:name, :cash)
    end

end
