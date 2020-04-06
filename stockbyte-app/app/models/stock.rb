class Stock < ApplicationRecord
    belongs_to :portfolio
    has_many :trades
end
