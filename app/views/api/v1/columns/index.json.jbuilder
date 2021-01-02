json.array! @columns do |column|
  json.id column.id
  json.name column.name
  json.tasks do
    json.array! column.tasks do |task|
      json.id task.id
      json.name task.name
      json.color task.color
      json.description task.description
      json.created_at task.created_at
    end
  end
end
