class CreateTrades < ActiveRecord::Migration[6.0]
  def change
    create_table :trades do |t|
      t.integer :action
      t.float :price
      t.integer :quantity
      t.integer :stock_id

      t.timestamps
    end
  end
end
