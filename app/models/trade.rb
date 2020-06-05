class Trade < ApplicationRecord
  belongs_to :stock
  
  def cost
    action * quantity * price
  end
  
  # Redefine json method to also include cost in json render
  def as_json(options = {})
    super options.merge(methods: [:cost])
  end
  
  validates :action, :price, :quantity, :stock_id, presence: true
  validates :action, numericality: { greater_than_or_equal_to: -1 }
  validates :action, numericality: { less_than_or_equal_to: 1 }
  validates :price, numericality: { greater_than_or_equal_to: 0 }
  validates :quantity, numericality: { greater_than_or_equal_to: 0 }
end
