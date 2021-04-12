import { NextFunction, Request, Response, Router } from 'express'
import { getRepository } from 'typeorm'
import DeviceNotFoundException from '../exceptions/DeviceNotFoundException'
import Controller from '../interfaces/controller.interface'
import CreateDeviceDto from './device.dto'
import Device from './device.entity'

class DeviceController implements Controller {
  public path = '/devices'
  public router = Router()
  private deviceRepository = getRepository(Device)

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
    _request: Request,
    response: Response
  ) => {
    const devices = await this.deviceRepository.find()
    response.send(devices)
  }

  private getDeviceById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id
    const device = await this.deviceRepository.findOne(id)
    if (device) {
      response.send(device)
    } else {
      next(new DeviceNotFoundException(id))
    }
  }

  private createDevice = async (
    request: Request,
    response: Response
  ) => {
    const deviceData: CreateDeviceDto = request.body
    const newDevice = this.deviceRepository.create(deviceData)
    await this.deviceRepository.save(newDevice)
    response.send(newDevice)
  }

  /*
   * This api will return 204 regardless of the result.
   * There is a bug in TypeORM when using sqlite.
   * Issue: https://github.com/typeorm/typeorm/issues/2415#issuecomment-455263074
   */
  private deleteDevice = async (
    request: Request,
    response: Response
  ) => {
    const id = request.params.id
    await this.deviceRepository.delete(id)
    response.sendStatus(204)
  }

  private modifyDevice = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id
    const postData: Device = request.body
    await this.deviceRepository.update(id, postData)
    const updatedPost = await this.deviceRepository.findOne(id)
    if (updatedPost) {
      response.send(updatedPost)
    } else {
      next(new DeviceNotFoundException(id))
    }
  }

}

export default DeviceController
