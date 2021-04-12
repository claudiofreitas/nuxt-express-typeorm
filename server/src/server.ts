import 'dotenv/config'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import config from './ormconfig'
import App from './app'
import DeviceController from './device/device.controller'

(async () => {
  try {
    const connection = await createConnection(config)
    await connection.runMigrations()
  } catch (error) {
    console.log('Error while connecting to the database', error)
    return error
  }
  const app = new App([
    new DeviceController()
  ])
  app.listen()
})()
