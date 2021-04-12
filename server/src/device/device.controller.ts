import { NextFunction, Request, Response, Router } from 'express'
import Controller from '../interfaces/controller.interface'

class DeviceController implements Controller {
  public path = '/devices'
  public router = Router()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllDevices)
    this.router.get(`${this.path}/:id`, this.getDeviceById)
    this.router.post(this.path, this.createDevice)
    this.router.delete(`${this.path}/:id`, this.deleteDevice)
    this.router.patch(`${this.path}/:id`, this.modifyDevice)
  }

  private getAllDevices = async (
    request: Request,
    response: Response
  ) => {
    // TODO
  }

  private getDeviceById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    // TODO
  }

  private createDevice = async (
    request: Request,
    response: Response
  ) => {
    // TODO
  }

  private deleteDevice = async (
    request: Request,
    response: Response
  ) => {
    // TODO
  }

  private modifyDevice = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    // TODO
  }

}

export default DeviceController
