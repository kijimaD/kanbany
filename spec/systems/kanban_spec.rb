require 'rails_helper'

RSpec.describe 'kanban', type: :system, js: true do
  let!(:user) { create(:user) }
  let!(:board) { create(:board, user: user) }
  let!(:column) { create(:column, board: board) }
  # let!(:task) { create(:task, column: column) }

  before do
    visit '/develop'
  end

  scenario 'Card' do
    # カードが存在しない
    expect(page).not_to have_field('Description', with: '')
    expect(page).not_to have_field('Category', with: '')

    # カードを追加できる
    click_button 'add'
    expect(page).to have_field('Description', with: '')
    expect(page).to have_field('Category', with: '')

    # カードを編集できる
    fill_in 'Description', with: 'This is Description'
    fill_in 'Category', with: 'This is Category'
    sleep 1

    # 入力が保存できる
    visit '/develop'
    expect(page).to have_field('Description', with: 'This is Description')
    expect(page).to have_field('Category', with: 'This is Category')
    expect(page).not_to have_field('Description', with: 'MyString')
    expect(page).not_to have_field('Category', with: 'MyString')

    # コピーできる
    click_button 'whatshot'
    click_button 'copy_all'
    expect(page).to have_field('Description', with: '')
    expect(page).to have_field('Category', with: 'This is Category')

    # 削除できる
    click_button 'delete_sweep'
    expect(page).not_to have_field('Description', with: 'This is Description')
  end
end
