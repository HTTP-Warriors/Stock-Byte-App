class CleanSomeColumns < ActiveRecord::Migration[6.0]
  def change
    remove_column :portfolios, :total_cost
    remove_column :stocks, :average_price
  end
end
