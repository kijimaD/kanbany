require 'rails_helper'

RSpec.describe Task, type: :model do
  describe 'factory' do
    it 'has a valid factory' do
      expect(create(:task)).to be_valid
      expect(build(:task)).to be_valid
    end
  end
end
