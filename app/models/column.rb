class Column < ApplicationRecord
  include RankedModel
  belongs_to :board
  has_many :tasks, ->{ order('row_order asc') }, dependent: :destroy

  ranks :row_order, :with_same => :board_id
end
