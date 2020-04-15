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
    
    # Redfine json method to also include total cost in json render
    def as_json(options = {})
      super options.merge(methods: [:total_cost])
    end

    validates :name, presence: true
    validates_uniqueness_of :name, scope: :user_id
end
