class CleanMoreColumns < ActiveRecord::Migration[6.0]
  def change
    remove_column :portfolios, :total_worth
    remove_column :stocks, :total_value
  end
end
