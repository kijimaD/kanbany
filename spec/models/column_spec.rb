require 'rails_helper'

RSpec.describe Column, type: :model do
  describe 'factory' do
    it "has a valid factory" do
      expect(create(:column)).to be_valid
      expect(build(:column)).to be_valid
    end
  end
end
