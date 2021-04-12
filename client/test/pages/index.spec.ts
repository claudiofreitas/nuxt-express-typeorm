import Vuetify from 'Vuetify'
import {
  createLocalVue,
  shallowMount,
  ThisTypedShallowMountOptions,
} from '@vue/test-utils'
import DeviceListPage from '@/pages/index.vue'

const localVue = createLocalVue()
let vuetify: Vuetify

beforeEach(() => {
  vuetify = new Vuetify()
})

const mountFunction = (options: ThisTypedShallowMountOptions<any>) => {
  return shallowMount(DeviceListPage, {
    localVue,
    vuetify,
    stubs: {
      'v-card': true,
    },
    ...options,
  })
}

describe('DeviceListPage', () => {
  it('should list devices on mount', async () => {
    const mockAxiosGet = jest.fn()
    await mountFunction({
      mocks: {
        $axios: {
          $get: mockAxiosGet,
        },
      },
    })
    expect(mockAxiosGet).toHaveBeenCalledWith('http://localhost:5000/devices')
  })
})
