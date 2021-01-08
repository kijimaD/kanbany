class Api::V1::ColumnsController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    @columns = Column.rank(:row_order)
  end

  def create
    column = Column.create(column_params)
    render json: column
  end

  def update
    column = Column.find(params[:id])
    column.update(column_params)
    render json: column
  end

  def destroy
    column = Column.find(params[:id])
    column.destroy
  end

  private

  def column_params
    params.require(:column).permit(:id, :name, :board_id, :row_order_position)
  end
end
