require 'rails_helper'

RSpec.describe Board, type: :model do
  describe Board do
    it "is valid with user" do
      user = create(:user)
      board = create(:board, user: user)
      expect(board).to be_valid
    end
  end
end
