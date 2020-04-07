class Trade < ApplicationRecord
    belongs_to :stock
    def cost
        action * quantity * price
    end
    validates :action, :price, :quantity, :stock_id, presence: true
    validates :action, numericality: { greater_than_or_equal_to: -1, less_than_or_equal_to: 1 }
    validates :price, numericality: { greater_than_or_equal_to: 0 }
    validates :quantity, numericality: { greater_than_or_equal_to: 0 }

end
