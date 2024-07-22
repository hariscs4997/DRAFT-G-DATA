module.exports = {
  apps: [
    {
      script: 'index.js',
      watch: '.',
    },
    {
      script: './service-worker/',
      watch: ['./service-worker'],
    },
  ],

  deploy: {
    production: {
      user: 'ubuntu',
      host: 'app.g-datalabs.com',
      ref: 'origin/master',
      repo: 'git@github.com:Shehzer-Aurangzeb/G-DataLabs.git',
      path: '/home/ubuntu',
      'pre-deploy-local': '',
      'post-deploy':
        'source ~/.nvm/nvm.sh && npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
    },
  },
};
