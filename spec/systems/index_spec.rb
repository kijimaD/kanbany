require 'rails_helper'

RSpec.describe 'top_page', type: :system, js: true do
  it 'Display top page' do
    create(:user)
    user = create(:user)
    create(:board, user: user)
    visit '/'
    expect(page).to have_content('Kanbany')
  end
end
