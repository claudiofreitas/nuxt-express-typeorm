import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as cors from 'cors'
import loggerMiddleware from './middleware/logger.middleware'
import Controller from './interfaces/controller.interface'
import errorMiddleware from './middleware/error.middleware'

class App {
  private PORT = 5000
  private app: express.Application

  constructor(controllers: Controller[]) {
    this.app = express()

    this.initializeMiddleware()
    this.initializeControllers(controllers)
    this.initializeErrorHandling()
  }

  public listen() {
    this.app.listen(this.PORT, () => {
      console.log(`Listening on: http://localhost:${this.PORT}/`)
    })
  }

  public getServer() {
    return this.app
  }

  private initializeMiddleware() {
    this.app.use(cors())
    this.app.use(bodyParser.json())
    this.app.use(loggerMiddleware)
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware)
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router)
    })
  }
}

export default App
