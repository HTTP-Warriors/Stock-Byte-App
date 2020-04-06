class CreateStocks < ActiveRecord::Migration[6.0]
  def change
    create_table :stocks do |t|
      t.string :symbol
      t.integer :total_quantity
      t.float :average_price
      t.float :total_value
      t.integer :portfolio_id

      t.timestamps
    end
  end
end
