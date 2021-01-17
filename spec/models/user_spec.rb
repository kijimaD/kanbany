require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'factory' do
    it 'has a valid factory' do
      expect(create(:user)).to be_valid
      expect(build(:user)).to be_valid
    end
  end
end
