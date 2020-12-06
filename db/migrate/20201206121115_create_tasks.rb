class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks do |t|
      t.references :column, foreign_key: true, null: false
      t.string :name, null: false
      t.string :description

      t.timestamps
    end
  end
end
