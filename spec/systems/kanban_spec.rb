require 'rails_helper'

RSpec.describe 'kanban', type: :system, js: true do
  let!(:user) { create(:user) }
  let!(:board) { create(:board, user: user) }
  let!(:column) { create(:column, board: board) }
  let!(:task) { create(:task, column: column) }

  before do
    visit '/develop'
  end

  scenario 'Can edit cards' do
    # カードを編集できる
    fill_in 'Description', with: 'This is Description'
    fill_in 'Category', with: 'This is Category'
    sleep 2

    # 入力が保存できる
    visit '/develop'
    expect(page).to have_field('Description', with: 'This is Description')
    expect(page).to have_field('Category', with: 'This is Category')
    expect(page).not_to have_field('Description', with: 'MyString')
    expect(page).not_to have_field('Category', with: 'MyString')
    sleep 1

    # コピーできる
    click_button 'whatshot'
    click_button 'copy_all'
    expect(page).to have_field('Description', with: '')
    expect(page).to have_field('Category', with: 'This is Category')
    sleep 1

    # 削除できる
    click_button 'delete_sweep'
    expect(page).not_to have_field('Description', with: 'This is Description')
    sleep 1
  end
end
