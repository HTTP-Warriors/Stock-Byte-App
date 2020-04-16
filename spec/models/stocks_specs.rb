require 'rails_helper'

describe Stock do 
    
    it 'has to be real' do
        expect{ Stock.new }.to_not raise_error
    end
    
    
    #Test not working ATM
    #it 'calculates total_quantity' do
    #    stock = Stock.create(symbol: "test")
    #    stock.trades.create( action: 1, price: 225.00, quantity: 10)
    #    expect(stock.total_quantity).to be 2250.00
    #end
    
    it 'check validation of existence' do
        is_expected.to validate_presence_of(:symbol)
    end
end