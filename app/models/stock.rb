class Stock < ApplicationRecord
  belongs_to :portfolio
  has_many :trades

  def total_quantity
    sum = 0
    trades.each do |trade|
      sum += trade.quantity * trade.action
    end
    sum
  end

# track trade.quantity, if sum of trade.quantity is 0, reset, for example, trade.quantity: (100,-100,200,150), trade.price(100,105,102,101), value = 200*102+150*101
  def value
    quantity_sum = 0
    value_sum = 0
    trades.each do |trade|
        quantity_sum += trade.quantity * trade.action
        if quantity_sum == 0
          value_sum = 0
        else
          value_sum += trade.price * trade.quantity * trade.action
        end
    end
    value_sum
  end

  def average_price
      if total_quantity == 0
        return 0
      else
        (value / total_quantity)
      end
  end

  # Redefine json method to also include cost, value, and average price in json render
  def as_json(options = {})
    super options.merge(methods: [:total_quantity, :value, :average_price])
  end

  #validates :symbol, presence: true
  validates_uniqueness_of :symbol, scope: :portfolio_id
end
