require 'rails_helper'

RSpec.describe Board, type: :model do
  describe 'factory' do
    it 'has a valid factory' do
      expect(create(:board)).to be_valid
      expect(build(:board)).to be_valid
    end
  end
end
