class Trade < ApplicationRecord
    belongs_to :stock
    def sale
        action * quantity * price
    end
end
