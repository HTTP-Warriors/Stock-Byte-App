class CreatePortfolios < ActiveRecord::Migration[6.0]
  def change
    create_table :portfolios do |t|
      t.integer :user_id
      t.float :total_cost
      t.float :total_worth
      t.string :name

      t.timestamps
    end
  end
end
