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

  #Defining portfolio params
  private
    def portfolio_params
      params.require(:portfolio).permit(:name)
    end
end
