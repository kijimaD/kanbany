class Api::V1::ColumnsController < ApplicationController
  def index
    @columns = Column.all
  end
end
