#!/usr/bin/env node

const taskManager = require('./taskManager');

const [, , command, ...args] = process.argv;

if (!command) {
  showHelp();
  process.exit(0);
}

switch (command) {
  case 'add':
    taskManager.add(args.join(' '));
    break;

  case 'list': {
    const filter = args[0];
    const validFilters = ['done', 'todo', 'in-progress'];
    if (filter && !validFilters.includes(filter)) {
      console.error(`Error: Invalid status '${filter}'. Use: done, todo, or in-progress`);
      process.exit(1);
    }
    taskManager.list(filter);
    break;
  }

  case 'update': {
    const id = parseInt(args[0], 10);
    const description = args.slice(1).join(' ');
    taskManager.update(id, description);
    break;
  }

  case 'delete': {
    const id = parseInt(args[0], 10);
    taskManager.deleteTask(id);
    break;
  }

  case 'mark-in-progress': {
    const id = parseInt(args[0], 10);
    taskManager.markTask(id, 'in-progress');
    break;
  }

  case 'mark-done': {
    const id = parseInt(args[0], 10);
    taskManager.markTask(id, 'done');
    break;
  }

  default:
    console.error(`Unknown command: ${command}`);
    showHelp();
    process.exit(1);
}

function showHelp() {
  console.log('Usage:');
  console.log('  task-cli add "task description"');
  console.log('  task-cli update <id> "new description"');
  console.log('  task-cli delete <id>');
  console.log('  task-cli mark-in-progress <id>');
  console.log('  task-cli mark-done <id>');
  console.log('  task-cli list');
  console.log('  task-cli list done');
  console.log('  task-cli list todo');
  console.log('  task-cli list in-progress');
}
