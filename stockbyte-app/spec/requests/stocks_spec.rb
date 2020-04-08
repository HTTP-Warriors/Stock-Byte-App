require 'rails_helper'

describe "Stock API", type: :request do
    it "gets list of stocks from portfolio default" do
        user = User.create(:email => 'test@email.com', :password => 'pw1234')
        portfolio = user.portfolios.create(name: "test_portfolio", user_id: user.id)
        
        #Create two stocks for portfolio
        stock_one = Stock.create(symbol: "TEST1", portfolio_id: portfolio.id)
        Trade.create(action: 1, price: 225.00, quantity: 10, stock_id: stock_one.id)
        Stock.create(symbol: "TEST2", portfolio_id: portfolio.id)
        
        get '/stocks?portfolio=test_portfolio'  
        
        json = JSON.parse(response.body)
        
        expect(response).to have_http_status(:ok)
        expect(json.length).to eq 2
    end
    it "creates a Stock" do
        
        #Create User, Portfolio, and Stock to test Trades
        user = User.create(:email => 'test@email.com', :password => 'pw1234')
        user.portfolios.create(name: "test_portfolio", user_id: user.id)
        
        stock_params = {
            stock: {
                symbol: "test"
            }
        }
        post '/stocks?portfolio=test_portfolio', params: stock_params
        
        
        expect(response).to have_http_status(:ok)
        
        new_stock = Stock.first
        
        expect(new_stock.symbol).to eq("test")
    end
end