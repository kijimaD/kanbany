class Api::V1::TasksController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    task = Task.create(task_params)
    render json: task
  end

  def update
    task = Task.find(params[:id])
    task.update(task_params)
    render json: task
  end

  def destroy
    task = Task.find(params[:id])
    task.destroy
  end

  private

  def task_params
    params.require(:task).permit(:id, :name, :color, :description, :column_id, :moved_at)
  end
end
