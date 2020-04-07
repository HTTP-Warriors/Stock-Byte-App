class Trade < ApplicationRecord
    belongs_to :stock
    def cost
        action * quantity * price
    end
end
