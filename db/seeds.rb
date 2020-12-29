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
  name: "Study React",
  description: "p0-10",
  column_id: 1,
)

Task.create!(
  name: "Study Rails",
  description: "p0-20",
  column_id: 1,
)

Task.create!(
  name: "Study Rails",
  description: "p20-30",
  column_id: 1,
)

Task.create!(
  name: "Study English",
  description: "p300-350",
  column_id: 2,
)

Task.create!(
  name: "Study Chinese",
  description: "p10-50",
  column_id: 2,
)
