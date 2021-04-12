import Vue from 'vue'
import Vuetify from 'Vuetify'
import { shallowMount, ThisTypedShallowMountOptions } from '@vue/test-utils'
import DeviceListPage from '@/pages/index.vue'

Vue.use(Vuetify)

const mockAxiosGet = jest.fn()
const mockAxiosDelete = jest.fn()
const mockRouterPush = jest.fn()
const mountFunction = (options?: ThisTypedShallowMountOptions<any>) => {
  return shallowMount(DeviceListPage, {
    mocks: {
      $axios: {
        $get: mockAxiosGet,
        $delete: mockAxiosDelete,
      },
      $router: {
        push: mockRouterPush,
      },
    },
    ...options,
  })
}
const createDummyDevice = () => ({
  id: 3,
  device: 'MotoG',
  os: 'Android4.3',
  manufacturer: 'Motorola',
  lastCheckedOutDate: '2016-02-21T09:10:00-05:00',
  lastCheckedOutBy: 'ChrisEvans',
  isCheckedOut: false,
})

describe('DeviceListPage', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should list devices on mount', async () => {
    await mountFunction()
    expect(mockAxiosGet).toHaveBeenCalledWith('http://localhost:5000/devices')
  })

  it('should redirect to edit page on click to pencil icon', async () => {
    const dummyDevice = createDummyDevice()
    mockAxiosGet.mockResolvedValue([dummyDevice])

    const wrapper = await mountFunction()
    await wrapper.vm.$nextTick
    await wrapper.vm.onEdit(`${dummyDevice.id}`)
    await wrapper.vm.$nextTick

    expect(mockRouterPush).toHaveBeenCalledWith(`/${dummyDevice.id}`)
  })

  it('should delete device on click to delete icon', async () => {
    const dummyDevice = createDummyDevice()
    mockAxiosGet.mockResolvedValue([dummyDevice])

    const wrapper = await mountFunction()
    await wrapper.vm.$nextTick
    await wrapper.vm.onDelete(`${dummyDevice.id}`)
    await wrapper.vm.$nextTick

    expect(mockAxiosDelete).toHaveBeenCalledWith(
      `http://localhost:5000/devices/${dummyDevice.id}`
    )
  })
})
