class Column < ApplicationRecord
  belongs_to :board
  has_many :tasks, dependent: :destroy

  include RankedModel
  ranks :row_order
end
