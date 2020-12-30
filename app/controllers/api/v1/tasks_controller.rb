class Api::V1::TasksController < ApplicationController
  protect_from_forgery with: :null_session

  def destroy
    @task = Task.find(params[:id])
    @task.delete
  end
end
