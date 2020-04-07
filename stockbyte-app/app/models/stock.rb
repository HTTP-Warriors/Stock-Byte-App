class Stock < ApplicationRecord
    belongs_to :portfolio
    has_many :trades

    def total_quantity
        Trade.all.sum(:quantity)
    end

    def value
        @sum = 0
        trades.each do |trade|
            @sum += trade.cost
        end
        @sum
    end

    def average_price
        value / total_quantity
    end
    
    validates :symbol, presence: true
    
end
