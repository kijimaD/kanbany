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
      expect(json[0]['id']).to eq(board1.id) # 0
      expect(json[1]['id']).to eq(board0.id) # 100
    end
  end

  describe '#create' do
    let!(:user) { create(:user) }
    let!(:board) { create(:board, user: user) }

    context 'valid_params' do
      specify do
        valid_params = { name: 'name', board_id: board.id }
        expect { post '/api/v1/columns', params: { column: valid_params } }.to change(Column, :count).by(+1)
        expect(response.status).to eq(200)
      end
    end
    context 'invalid_params' do
      specify do
        invalid_params = { name: 'name' }
        expect { post '/api/v1/columns', params: { column: invalid_params } }.to change(Column, :count).by(0)
        expect(response.status).to eq(200)
      end
    end
  end

  describe '#update' do
    specify do
      column = create(:column, name: 'old')
      put "/api/v1/columns/#{column.id}", params: { column: { name: 'new' } }
      json = JSON.parse(response.body)

      expect(response.status).to eq(200)
      expect(json['name']).to eq('new')
    end
  end

  describe '#delete' do
    specify do
      column = create(:column)

      expect { delete "/api/v1/columns/#{column.id}" }.to change(Column, :count).by(-1)
      expect(response.status).to eq(204)
    end
  end
end
