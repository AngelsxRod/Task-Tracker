const storage = require('./storage');

function add(description) {
  if (!description || !description.trim()) {
    console.error('Error: Task description is required');
    process.exit(1);
  }

  const data = storage.readTasks();
  const task = {
    id: data.nextId++,
    description: description.trim(),
    status: 'todo',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  data.tasks.push(task);
  storage.writeTasks(data);
  console.log(`Task added successfully (ID: ${task.id})`);
}

module.exports = { add };
