require 'rails_helper'

describe Trade do 
    it 'has to be real' do
        expect{ Trade.new }.to_not raise_error
    end
    
    it 'calculates cost of trade' do
        trade = Trade.create( action: 1, price: 225.00, quantity: 10, stock_id: 1 )
        expect(trade.cost).to be 2250.00
    end
    
    it 'check validation of existence' do
        is_expected.to validate_presence_of(:action)
        is_expected.to validate_presence_of(:price)
        is_expected.to validate_presence_of(:quantity)
        is_expected.to validate_presence_of(:stock_id)
    end
    
    it 'validates action is 1 or -1' do
        is_expected.to allow_values(1, -1).for(:action)
        is_expected.to_not allow_values(-2,2,3,-5).for(:action) 
    end
    
    it 'validates price is greater than 0' do
        is_expected.to allow_values(1, 35, 100).for(:price)
        is_expected.to_not allow_values(-2, -30, -500).for(:price) 
    end  
    
    it 'validates quantity is greater than 0' do
        is_expected.to allow_values(1, 35, 100).for(:quantity)
        is_expected.to_not allow_values(-2, -30, -500).for(:quantity) 
    end
 
end