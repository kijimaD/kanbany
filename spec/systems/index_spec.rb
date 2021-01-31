require 'rails_helper'

RSpec.describe 'top_page', type: :system, js: true do
  let!(:user1) { create(:user) }
  let!(:user2) { create(:user) }
  let!(:board) { create(:board, user: user2) }
  let!(:column) { create(:column, board: board) }

  it 'Display top page' do
    visit '/'
  end
end
