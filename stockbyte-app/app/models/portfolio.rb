class Portfolio < ApplicationRecord
    belongs_to :user
    has_many :stocks

    def total_cost
      @sum=0
      stocks.each do |stock|
        @sum += stock.value
      end
      @sum
    end
    def as_json(options = {})
      super options.merge(methods: [:total_cost])
    end

    validates :name, presence: true

end
