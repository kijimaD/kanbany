class AddColumnToTask < ActiveRecord::Migration[6.0]
  def change
    add_column :tasks, :color, :string, null: false, default: "black"
  end
end
