class User < ApplicationRecord
  has_many :boards, dependent: :destroy
  after_create_commit { MessageBroadcastJob.perform_later self }
end
