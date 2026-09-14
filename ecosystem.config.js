module.exports = {
  apps: [
    {
      name: 'CIET2026',
      script: 'node_modules/next/dist/bin/next',
      args: 'dev',
      instances: 1,           // El modo desarrollo NO soporta modo clúster
      exec_mode: 'fork',      // Debe ejecutarse obligatoriamente en modo fork
      watch: false,           // El propio Next.js ya detecta y recarga los cambios de código
      env: {
        NODE_ENV: 'development',
        PORT: 3000            // El puerto que desees utilizar
      }
    }
  ]
}

