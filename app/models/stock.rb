class Stock < ApplicationRecord
    belongs_to :portfolio
    has_many :trades

    def total_quantity
        @sum = 0
        trades.each do |trade|
          @sum += trade.quantity * trade.action
        end
        @sum
    end

    def value
        @sum = 0
        trades.each do |trade|
            @sum += trade.cost
        end
        @sum
    end

    def average_price
        if total_quantity == 0
            return 0
        else
            (value / total_quantity)
        end
    end

    # Redfine json method to also include cost, value, and average price in json render
    def as_json(options = {})
      super options.merge(methods: [:total_quantity, :value, :average_price])
    end


    validates :symbol, presence: true
    validates_uniqueness_of :symbol, scope: :portfolio_id

end
