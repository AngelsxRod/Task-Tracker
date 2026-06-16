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

function list() {
  const data = storage.readTasks();

  if (data.tasks.length === 0) {
    console.log('No tasks found');
    return;
  }

  console.log('ID  Description           Status        Created');
  console.log('--- -------------------- ------------- -------------------------');
  data.tasks.forEach(task => {
    const desc = task.description.padEnd(20).slice(0, 20);
    const status = task.status.padEnd(13);
    const date = new Date(task.createdAt).toLocaleString();
    console.log(`${String(task.id).padEnd(3)} ${desc} ${status} ${date}`);
  });
}

function update(id, description) {
  if (!description || !description.trim()) {
    console.error('Error: Task description is required');
    process.exit(1);
  }

  const data = storage.readTasks();
  const task = data.tasks.find(t => t.id === id);

  if (!task) {
    console.error(`Error: Task with ID ${id} not found`);
    process.exit(1);
  }

  task.description = description.trim();
  task.updatedAt = new Date().toISOString();
  storage.writeTasks(data);
  console.log(`Task updated successfully (ID: ${id})`);
}

function deleteTask(id) {
  const data = storage.readTasks();
  const index = data.tasks.findIndex(t => t.id === id);

  if (index === -1) {
    console.error(`Error: Task with ID ${id} not found`);
    process.exit(1);
  }

  data.tasks.splice(index, 1);
  storage.writeTasks(data);
  console.log(`Task deleted successfully (ID: ${id})`);
}

function markTask(id, status) {
  const data = storage.readTasks();
  const task = data.tasks.find(t => t.id === id);

  if (!task) {
    console.error(`Error: Task with ID ${id} not found`);
    process.exit(1);
  }

  task.status = status;
  task.updatedAt = new Date().toISOString();
  storage.writeTasks(data);
  console.log(`Task ${id} marked as ${status}`);
}

module.exports = { add, list, update, deleteTask, markTask };
