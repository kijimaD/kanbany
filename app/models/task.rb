class Task < ApplicationRecord
  belongs_to :column
  before_create :set_moved_at_now

  include RankedModel
  ranks :row_order, :with_same => :column_id

  def set_moved_at_now
    self.moved_at = Time.now
  end
end
