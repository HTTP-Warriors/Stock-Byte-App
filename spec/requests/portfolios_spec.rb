require 'rails_helper'

describe "Portfolio API", type: :request do
    it "gets list of portfolios" do
        user = User.create(:email => 'test@email.com', :password => 'pw1234', :nick_name => "test")
        user.portfolios.create(name: "test_portfolio1", user_id: user.id)
        sign_in user

        get '/portfolios'

        json = JSON.parse(response.body)

        expect(response).to have_http_status(:ok)
        expect(json.length).to eq 1
    end

    it "creates a portfolio" do
        #Create User, Portfolio, and Stock to test Trades
        user = User.create(:email => 'test@email.com', :password => 'pw1234', :nick_name => "test")

        sign_in user
        portfolio_params = {
            portfolio: {
                name: "test"
            }
        }
        post '/portfolios', params: portfolio_params
        expect(response).to have_http_status(:ok)
        new_portfolio = Portfolio.first
        expect(new_portfolio.name).to eq("test")
    end
  end
