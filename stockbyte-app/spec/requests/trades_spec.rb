require 'rails_helper'

describe "Trades API", type: :request do
    it "gets a list of Trades" do
        
        #Create User, Portfolio, and Stock to test Trades
        user = User.create(:email => 'test@email.com', :password => 'pw1234')
        portfolio = user.portfolios.create(name: "test_portfolio", user_id: user.id)
        stock = Stock.create(symbol: "TEST", portfolio_id: portfolio.id)
        Trade.create(action: 1, price: 225.00, quantity: 10, stock_id: stock.id)
        
        get '/trades?portfolio=test_portfolio&stock=TEST'
        
        json = JSON.parse(response.body)
        
        expect(response).to have_http_status(:ok)
        expect(json.length).to eq 1
    end
    
    it "creates a Trade" do
        
        #Create User, Portfolio, and Stock to test Trades
        user = User.create(:email => 'test@email.com', :password => 'pw1234')
        portfolio = user.portfolios.create(name: "test_portfolio", user_id: user.id)
        Stock.create(symbol: "TEST", portfolio_id: portfolio.id)
        
        trade_params = {
            trade: {
                action: 1,
                price: 100.00,
                quantity: 20
            }
        }
        
        post '/trades?portfolio=test_portfolio&stock=TEST', params: trade_params
        
        expect(response).to have_http_status(:ok)
        
        new_trade = Trade.first
        
        expect(new_trade.action).to eq(1)
        expect(new_trade.price).to eq(100.00)
        expect(new_trade.quantity).to eq(20)
    end
end