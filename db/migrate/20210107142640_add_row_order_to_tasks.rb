class AddRowOrderToTasks < ActiveRecord::Migration[6.0]
  def change
    add_column :tasks, :row_order, :integer
  end
end
