import HttpException from './HttpException'

class DeviceNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Device with id ${id} not found`)
  }
}

export default DeviceNotFoundException
