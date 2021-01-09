class AddRowOrderToColumns < ActiveRecord::Migration[6.0]
  def change
    add_column :columns, :row_order, :integer
  end
end
