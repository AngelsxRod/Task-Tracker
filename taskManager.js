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

module.exports = { add, list };
