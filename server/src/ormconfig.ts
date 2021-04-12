import { ConnectionOptions } from 'typeorm'

const config: ConnectionOptions = {
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true, //! turn off when using in production
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/migrations',
  },
}

export default config
