# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
test = User.first
test.portfolios.create name: "default", total_worth:nil, total_cost:nil
test_portfolio = test.portfolios.first
stock =
  {
  symbol: "AAPL",
  total_quantity: nil,
  average_price: nil
  }

test_portfolio.stocks.create stock

test_stock = test_portfolio.stocks.first

trades = [
  {
    action:1,
    price:250,
    quantity:50,
  },
  {
    action:1,
    price:275,
    quantity:20
  }
]

trades.each do |attributes|
  test_stock.trades.create attributes
end
