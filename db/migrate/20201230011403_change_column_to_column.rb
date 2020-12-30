class ChangeColumnToColumn < ActiveRecord::Migration[6.0]
  def up
    change_column :columns, :name, :string, null: false, default: ""
  end

  def down
    change_column :columns, :name, :string, null: false
  end
end
