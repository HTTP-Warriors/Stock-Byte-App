# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

test = User.first
test.portfolios.create name: "default"
test_portfolio = test.portfolios.first
stock1 =
  {
  symbol: "AAPL",
  }

stock2 =
    {
    symbol: "AMZN",
    }
test_portfolio.stocks.create stock1
test_portfolio.stocks.create stock2

test_stock1 = test_portfolio.stocks.first

trades1 = [
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

trades1.each do |attributes|
  test_stock1.trades.create attributes
end

test_stock2 = test_portfolio.stocks.second

trades2 = [
  {
    action:1,
    price:340,
    quantity:90,
  },
  {
    action:1,
    price:380,
    quantity:35
  }
]

trades2.each do |attributes|
  test_stock2.trades.create attributes
end

