class Column < ApplicationRecord
  belongs_to :board
  has_many :tasks, dependent: :destroy
  has_many :tasks, ->{ order('row_order asc') }

  include RankedModel
  ranks :row_order, :with_same => :board_id
end
