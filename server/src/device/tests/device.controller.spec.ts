import * as request from 'supertest'
import * as typeorm from 'typeorm'
import App from '../../app'
import DeviceController from '../device.controller'

(typeorm as any).getRepository = jest.fn()

const dummyDeviceData = { 
  id: 3, 
  device: 'MotoG', 
  os: 'Android4.3', 
  manufacturer: 'Motorola', 
  lastCheckedOutDate: '2016-02-21T09:10:00-05:00', 
  lastCheckedOutBy: 'ChrisEvans', 
  isCheckedOut: false 
}

describe('Device Controller', () => {
  describe('GET /devices', () => {
    it('should send 200 and a list of devices', () => {
      (typeorm as any).getRepository.mockReturnValue({
        find: () => Promise.resolve([dummyDeviceData]),
      })

      const deviceController = new DeviceController()
      const app = new App([deviceController])
      
      return request(app.getServer())
        .get(deviceController.path)
        .set('Accept', 'application/json')
        .expect(200)
        .expect([dummyDeviceData])
    })
  })

  describe('GET /devices/{id}', () => {
    it('should send 200 and a device', () => {
      (typeorm as any).getRepository.mockReturnValue({
        findOne: () => Promise.resolve(dummyDeviceData),
      })

      const deviceController = new DeviceController()
      const app = new App([deviceController])
      
      return request(app.getServer())
        .get(`${deviceController.path}/${dummyDeviceData.id}`)
        .expect(200)
        .expect(dummyDeviceData)
    })

    it('should send 404 if the device does not exist', () => {
      (typeorm as any).getRepository.mockReturnValue({
        findOne: () => Promise.resolve(undefined),
      })

      const deviceController = new DeviceController()
      const app = new App([deviceController])
      
      return request(app.getServer())
        .get(`${deviceController.path}/${dummyDeviceData.id}`)
        .expect(404)
        .expect({
          status: 404,
          message: `Device with id ${dummyDeviceData.id} not found`
        })
    })
  })

  describe('POST /devices', () => {
    it('should send 200 and a device if the request body is valid', () => {
      (typeorm as any).getRepository.mockReturnValue({
        create: () => dummyDeviceData,
        save: () => Promise.resolve()
      })
      
      const deviceController = new DeviceController()
      const app = new App([deviceController])
      
      return request(app.getServer())
        .post(`${deviceController.path}`)
        .set('Accept', 'application/json')
        .expect(200)
        .expect(dummyDeviceData)
    })
  })

  describe('DELETE /devices/{id}', () => {
    it('should send 204 status', () => {
      (typeorm as any).getRepository.mockReturnValue({
        delete: () => Promise.resolve(),
      })
      
      const deviceController = new DeviceController()
      const app = new App([deviceController])
      
      return request(app.getServer())
        .delete(`${deviceController.path}/${dummyDeviceData.id}`)
        .expect(204)
    })
  })

  describe('PATCH /devices/{id}', () => {
    it('should send 200 and a device if the request body is valid', () => {
      (typeorm as any).getRepository.mockReturnValue({
        update: () => Promise.resolve(),
        findOne: () => Promise.resolve(dummyDeviceData),
      })
      
      const deviceController = new DeviceController()
      const app = new App([deviceController])
      
      return request(app.getServer())
        .patch(`${deviceController.path}/${dummyDeviceData.id}`)
        .set('Accept', 'application/json')
        .expect(200)
        .expect(dummyDeviceData)
    })

    it('should send 404 if the device does not exist', () => {
      (typeorm as any).getRepository.mockReturnValue({
        update: () => Promise.resolve(),
        findOne: () => Promise.resolve(undefined),
      })

      const deviceController = new DeviceController()
      const app = new App([deviceController])
      
      return request(app.getServer())
        .patch(`${deviceController.path}/${dummyDeviceData.id}`)
        .set('Accept', 'application/json')
        .expect(404)
        .expect({
          status: 404,
          message: `Device with id ${dummyDeviceData.id} not found`
        })
    })
  })
})