class CreateColumns < ActiveRecord::Migration[6.0]
  def change
    create_table :columns do |t|
      t.references :board, foreign_key: true, null: false
      t.string :name, null: false

      t.timestamps
    end
  end
end
