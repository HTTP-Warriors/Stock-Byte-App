require 'rails_helper'

describe "Trades API", type: :request do
    it "gets a list of Trades" do
        user = User.create(:email => 'test@email.com', :password => 'pw1234')
        portfolio = Portfolio.create(name: "test_portfolio", user_id: user.id)
        stock = Stock.create(symbol: "TEST", portfolio_id: portfolio.id)
        Trade.create(action: 1, price: 225.00, quantity: 10, stock_id: stock.id)
        get '/trades'
        
        json = JSON.parse(response.body)
        expect(response).to have_http_status(:ok)
        expect(json.length).to eq 1
    end
end