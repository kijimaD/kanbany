class ChangeColumnToTaskDefault < ActiveRecord::Migration[6.0]
  def up
    change_column :tasks, :description, :string, null: false, default: ""
  end

  def down
    change_column :tasks, :description, :string, null: false
  end
end
