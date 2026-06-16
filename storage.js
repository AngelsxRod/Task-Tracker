const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'tasks.json');

function readTasks() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      const initial = { nextId: 1, tasks: [] };
      writeTasks(initial);
      return initial;
    }
    if (err instanceof SyntaxError) {
      console.error('Error: tasks.json is corrupted. Starting fresh.');
      const initial = { nextId: 1, tasks: [] };
      writeTasks(initial);
      return initial;
    }
    throw err;
  }
}

function writeTasks(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2) + '\n', 'utf-8');
}

module.exports = { readTasks, writeTasks };
