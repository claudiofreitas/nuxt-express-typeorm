import { DateTime } from 'luxon'

class DeviceService {
  public isCheckoutValid() {
    const currentTime = DateTime.now()
    const morningTime = currentTime.set({ hour: 9 })
    const eveningTime = currentTime.set({ hour: 17 })
    return morningTime < currentTime && currentTime < eveningTime
  }
}

export default DeviceService;
