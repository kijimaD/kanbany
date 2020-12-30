class ChangeColumnToTask < ActiveRecord::Migration[6.0]
  def up
    change_column :tasks, :name, :string, null: false, default: ""
  end

  def down
    change_column :tasks, :name, :string, null: false
  end
end
