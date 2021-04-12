import Vue from 'vue'
import Vuetify from 'Vuetify'
import { shallowMount, ThisTypedShallowMountOptions } from '@vue/test-utils'
import DeviceEditPage from '@/pages/_id.vue'

Vue.use(Vuetify)

const dummyId = '1'
const mockAxiosGet = jest.fn()
const mockAxiosPatch = jest.fn()
const mockRouterPush = jest.fn()
const mountFunction = (options?: ThisTypedShallowMountOptions<any>) => {
  return shallowMount(DeviceEditPage, {
    mocks: {
      $axios: {
        $get: mockAxiosGet,
        $patch: mockAxiosPatch,
      },
      $router: {
        push: mockRouterPush,
      },
      $route: {
        params: {
          id: dummyId,
        },
      },
    },
    ...options,
  })
}

describe('DeviceListPage', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it.skip('should show device details on mount', async () => {
    const dummyDevice = {
      id: dummyId,
      device: 'MotoG',
      os: 'Android4.3',
      manufacturer: 'Motorola',
      lastCheckedOutDate: '2016-02-21T09:10:00-05:00',
      lastCheckedOutBy: 'ChrisEvans',
      isCheckedOut: false,
    }
    mockAxiosGet.mockResolvedValue(dummyDevice)

    const wrapper = await mountFunction()
    await wrapper.vm.$nextTick
    expect(mockAxiosGet).toHaveBeenCalledWith(
      `http://localhost:5000/devices/${dummyDevice.id}`
    )

    await wrapper.vm.$nextTick
    expect(wrapper.vm.device).toBe(dummyDevice.device)
    expect(wrapper.vm.os).toBe(dummyDevice.os)
    expect(wrapper.vm.manufacturer).toBe(dummyDevice.manufacturer)
    expect(wrapper.vm.lastCheckedOutBy).toBe(dummyDevice.lastCheckedOutBy)
    expect(wrapper.vm.isCheckedOut).toBe(dummyDevice.isCheckedOut)
  })

  it('should call post redirect to home page on submit', async () => {
    const dummyDevice = {
      device: 'MotoG',
      os: 'Android4.3',
      manufacturer: 'Motorola',
      lastCheckedOutBy: 'ChrisEvans',
      isCheckedOut: false,
    }
    mockAxiosGet.mockResolvedValue(dummyDevice)

    const wrapper = await mountFunction()
    await wrapper.vm.$nextTick
    await wrapper.vm.$nextTick

    await wrapper.vm.onSubmit()
    await wrapper.vm.$nextTick
    expect(mockAxiosPatch).toHaveBeenCalledWith(
      `http://localhost:5000/devices/${dummyId}`,
      dummyDevice
    )

    await wrapper.vm.$nextTick
    expect(mockRouterPush).toHaveBeenCalledWith('/')
  })
})
