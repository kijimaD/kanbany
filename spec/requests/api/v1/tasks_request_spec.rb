require 'rails_helper'

RSpec.describe "Api::V1::Tasks", type: :request do
  describe '#create' do
    let!(:user) { create(:user) }
    let!(:board) { create(:board, user: user) }
    let!(:column) { create(:column, board: board) }

    context 'valid params' do
      specify do
        valid_params = { name: 'name', column_id: column.id }
        expect { post '/api/v1/tasks', params: { task: valid_params } }.to change(Task, :count).by(+1)
        expect(response.status).to eq(200)
      end
    end
    context 'invalid params' do
      specify do
        valid_params = { name: 'name' }
        expect { post '/api/v1/tasks', params: { task: valid_params } }.to change(Task, :count).by(0)
        expect(response.status).to eq(200)
      end
    end
  end

  describe '#update' do
    specify do
      task = create(:task, name: 'old')
      put "/api/v1/tasks/#{task.id}", params: { task: { name: 'new' } }
      json = JSON.parse(response.body)

      expect(response.status).to eq(200)
      expect(json['name']).to eq('new')
    end
  end

  describe '#delete' do
    specify do
      task = create(:task)

      expect { delete "/api/v1/columns/#{task.id}" }.to change(Task, :count).by(-1)
      expect(response.status).to eq(204)
    end
  end
end
