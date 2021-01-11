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

User.create!(
  name: 'Demo User',
  email: 'test2@examle.com',
)

User.create!(
  name: 'Demo User',
  email: 'test3@examle.com',
)

Board.create!(
  name: 'Working',
  user_id: 1,
)

Board.create!(
  name: 'Working',
  user_id: 2,
)

Board.create!(
  name: 'Working',
  user_id: 3,
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

Column.create!(
  name: "Done",
  board_id: 2,
)

Column.create!(
  name: "Today",
  board_id: 2,
)

Column.create!(
  name: "Week",
  board_id: 2,
)

Column.create!(
  name: "Month",
  board_id: 2,
)

Column.create!(
  name: "Month",
  board_id: 3,
)

Task.create!(
  name: "Develop Kanbany",
  description: "Add D&D",
  column_id: 1,
)

Task.create!(
  name: "Develop Kanbany",
  description: "Add header",
  column_id: 1,
)

Task.create!(
  name: "Develop Kanbany",
  description: "Pagination",
  column_id: 1,
)

Task.create!(
  name: "Develop Kanbany",
  description: "Fix font",
  column_id: 2,
)

Task.create!(
  name: "Read On Lisp",
  description: "p10-50",
  column_id: 2,
)

Task.create!(
  name: "Develop Kanbany",
  description: "Add D&D",
  column_id: 5,
)

Task.create!(
  name: "Develop Kanbany",
  description: "Add header",
  column_id: 5,
)

Task.create!(
  name: "Develop Kanbany",
  description: "Pagination",
  column_id: 5,
)

Task.create!(
  name: "Develop Kanbany",
  description: "Fix font",
  column_id: 6,
  color: "pink",
)

Task.create!(
  name: "Read On Lisp",
  description: "p10-50",
  column_id: 6,
)
