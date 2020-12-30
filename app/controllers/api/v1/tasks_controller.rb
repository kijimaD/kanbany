class Api::V1::TasksController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    task = Task.create(task_params)
    render json: task
  end

  def update
    task = task.find(params[:id])
    task.update(task_params)
    render json: task
  end

  def destroy
    task = Task.find(params[:id])
    task.delete
  end

  private

  def task_params
    params.require(:task).permit(:id, :name, :description, :column_id)
  end
end
