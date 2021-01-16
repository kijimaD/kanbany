class SyncBoardJob < ApplicationJob
  queue_as :default

  def perform
    ActionCable.server.broadcast('board_channel', {})
  end
end
