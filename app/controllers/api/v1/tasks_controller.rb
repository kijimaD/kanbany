class Api::V1::TasksController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    task = Task.create(task_params)
    SyncBoardJob.perform_later
    render json: task
  end

  def update
    task = Task.find(params[:id])
    task.update(task_params)
    SyncBoardJob.perform_later
    render json: task
  end

  def destroy
    task = Task.find(params[:id])
    task.destroy
    SyncBoardJob.perform_later
  end

  private

  def task_params
    params.require(:task).permit(:id, :name, :color, :description, :column_id, :moved_at, :row_order_position, :created_at)
  end
end
