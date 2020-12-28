# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create!(
  name: 'Test User',
  email: 'test@examle.com',
)

Board.create!(
  name: 'Working',
  user_id: 1,
)

Column.create!(
  name: "Done",
  board_id: 1,
)

Column.create!(
  name: "Today",
  board_id: 1,
)

Column.create!(
  name: "Week",
  board_id: 1,
)

Column.create!(
  name: "Month",
  board_id: 1,
)

Task.create!(
  name: "Task",
  description: "Study",
  column_id: 1,
)
