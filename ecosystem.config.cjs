module.exports = {
  apps: [{
    name: 'indian-export-website',
    script: 'npm',
    args: 'run dev',
    cwd: '/home/user/webapp',
    env: {
      NODE_ENV: 'development',
      PORT: 5173
    },
    watch: false,
    instances: 1,
    exec_mode: 'fork',
    max_restarts: 10,
    min_uptime: '10s',
    error_file: '/home/user/webapp/logs/error.log',
    out_file: '/home/user/webapp/logs/out.log',
    log_file: '/home/user/webapp/logs/combined.log',
    time: true
  }]
};