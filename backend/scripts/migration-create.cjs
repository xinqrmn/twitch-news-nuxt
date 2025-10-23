#!/usr/bin/env node
const { spawnSync } = require('node:child_process');

const nameArg = process.env.npm_config_name || process.argv.find(a => a.startsWith('--name='))?.split('=')[1];
if (!nameArg) {
  console.error('Pass --name=YourMigrationName');
  process.exit(1);
}

const args = [
  './node_modules/ts-node/dist/bin.js',
  './node_modules/typeorm/cli.js',
  '-d',
  './src/common/data-source.ts',
  'migration:create',
  `./src/migrations/${nameArg}`,
]

const result = spawnSync('node', args, { stdio: 'inherit', env: { ...process.env, NODE_ENV: 'development' } });
process.exit(result.status ?? 0);


