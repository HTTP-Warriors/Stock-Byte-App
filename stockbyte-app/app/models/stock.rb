class Stock < ApplicationRecord
    belongs_to :portfolio
    has_many :trades

    def total_quantity
        @sum = 0
        trades.each do |trade|
          @sum += trade.quantity
        end
        @sum
    end
    def value
        @sum = 0
        trades.each do |trade|
            @sum += trade.cost
        end
        @sum.round(2)
    end
    def average_price
        (value / total_quantity).round(2)
    end
    def as_json(options = {})
      super options.merge(methods: [:total_quantity, :value, :average_price])
    end


    validates :symbol, presence: true
    validates :symbol, uniqueness: true

end
