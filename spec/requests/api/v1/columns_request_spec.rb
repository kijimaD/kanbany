require 'rails_helper'

RSpec.describe "Api::V1::Columns", type: :request do

  describe '#index' do
    let!(:user) { create(:user) }
    let!(:board) { create(:board, user: user) }

    context 'exist column' do
      specify do
        create(:column, board: board)

        get "/api/v1/columns/#{user.id}"
        json = JSON.parse(response.body)

        expect(response.status).to eq(200)
        expect(json.length).to eq(1)
      end
    end
    context 'not exist column' do
      specify do
        get "/api/v1/columns/#{user.id}"
        json = JSON.parse(response.body)

        expect(response.status).to eq(200)
        expect(json.length).to eq(0)
      end
    end
    it 'sort by row_order' do
      board0 = create(:column, board: board, row_order: 100)
      board1 = create(:column, board: board, row_order: 0)

      get "/api/v1/columns/#{user.id}"
      json = JSON.parse(response.body)
      expect(json[0]["id"]).to eq(board1.id) # 0
      expect(json[1]["id"]).to eq(board0.id) # 100
    end

    it '#index' do

    end
  end
end
