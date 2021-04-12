import { DateTime } from 'luxon'
import * as request from 'supertest'
import * as typeorm from 'typeorm'
import App from '../../app'
import DeviceController from '../device.controller'

(typeorm as any).getRepository = jest.fn()

const createDummyDevice = () => ({ 
  id: 3, 
  device: 'MotoG', 
  os: 'Android4.3', 
  manufacturer: 'Motorola', 
  lastCheckedOutDate: DateTime.now().toISO(), 
  lastCheckedOutBy: 'ChrisEvans', 
  isCheckedOut: false 
})

describe('Device Controller', () => {
  describe('GET /devices', () => {
    it('should send 200 and a list of devices', () => {
      const dummyDevice = createDummyDevice();
      
      (typeorm as any).getRepository.mockReturnValue({
        find: () => Promise.resolve([dummyDevice]),
      })

      const deviceController = new DeviceController()
      const app = new App([deviceController])
      
      return request(app.getServer())
        .get(deviceController.path)
        .set('Accept', 'application/json')
        .expect(200)
        .expect([dummyDevice])
    })
  })

  describe('GET /devices/{id}', () => {
    it('should send 200 and a device', () => {
      const dummyDevice = createDummyDevice();

      (typeorm as any).getRepository.mockReturnValue({
        findOne: () => Promise.resolve(dummyDevice),
      })

      const deviceController = new DeviceController()
      const app = new App([deviceController])
      
      return request(app.getServer())
        .get(`${deviceController.path}/${dummyDevice.id}`)
        .expect(200)
        .expect(dummyDevice)
    })

    it('should send 404 if the device does not exist', () => {
      const dummyNonExistingId = '1';

      (typeorm as any).getRepository.mockReturnValue({
        findOne: () => Promise.resolve(undefined),
      })

      const deviceController = new DeviceController()
      const app = new App([deviceController])
      
      return request(app.getServer())
        .get(`${deviceController.path}/${dummyNonExistingId}`)
        .expect(404)
        .expect({
          status: 404,
          message: `Device with id ${dummyNonExistingId} not found`
        })
    })
  })

  describe('POST /devices', () => {
    it('should send 200 and a device if the request body is valid', () => {
      const dummyDevice = createDummyDevice();
      delete dummyDevice.lastCheckedOutDate;

      (typeorm as any).getRepository.mockReturnValue({
        create: () => dummyDevice,
        save: () => Promise.resolve()
      })
      
      const deviceController = new DeviceController()
      const app = new App([deviceController])
      
      return request(app.getServer())
        .post(`${deviceController.path}`)
        .set('Accept', 'application/json')
        .expect(200)
        .expect(dummyDevice)
    })
  })

  describe('DELETE /devices/{id}', () => {
    it('should send 204 status', () => {
      const dummyDevice = createDummyDevice();

      (typeorm as any).getRepository.mockReturnValue({
        delete: () => Promise.resolve(),
      })
      
      const deviceController = new DeviceController()
      const app = new App([deviceController])
      
      return request(app.getServer())
        .delete(`${deviceController.path}/${dummyDevice.id}`)
        .expect(204)
    })
  })

  describe('PATCH /devices/{id}', () => {
    it('should send 200 and a device if the request body is valid', () => {
      const dummyDevice = createDummyDevice();
      delete dummyDevice.lastCheckedOutDate;

      (typeorm as any).getRepository.mockReturnValue({
        update: () => Promise.resolve(),
        findOne: () => Promise.resolve(dummyDevice),
      })
      
      const deviceController = new DeviceController()
      const app = new App([deviceController])
      
      return request(app.getServer())
        .patch(`${deviceController.path}/${dummyDevice.id}`)
        .set('Accept', 'application/json')
        .expect(200)
        .expect(dummyDevice)
    })

    it('should send 404 if the device does not exist', () => {
      const dummyNonExistingId = '1';

      (typeorm as any).getRepository.mockReturnValue({
        update: () => Promise.resolve(),
        findOne: () => Promise.resolve(undefined),
      })

      const deviceController = new DeviceController()
      const app = new App([deviceController])
      
      return request(app.getServer())
        .patch(`${deviceController.path}/${dummyNonExistingId}`)
        .set('Accept', 'application/json')
        .expect(404)
        .expect({
          status: 404,
          message: `Device with id ${dummyNonExistingId} not found`
        })
    })
  })
})