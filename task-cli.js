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
