module.exports = {
  apps: [{
    name: 'banana-bot',
    script: 'ts-node',
    args: 'index.ts',
    autorestart: true,
    source_map_support: true,
    watch: ['commands/**/*','data/**/*','utilities/**/*', 'cron/**/*', '.env']
  }]
}