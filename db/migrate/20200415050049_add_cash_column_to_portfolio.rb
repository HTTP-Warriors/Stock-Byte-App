class AddCashColumnToPortfolio < ActiveRecord::Migration[6.0]
  def change
    add_column :portfolios, :cash, :float
  end
end
