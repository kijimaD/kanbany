class AddLastMoveColumnToTask < ActiveRecord::Migration[6.0]
  def change
    add_column :tasks, :moved_at, :datetime, null: false
  end
end
