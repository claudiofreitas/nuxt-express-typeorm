import Vue from 'vue'
import Vuetify from 'Vuetify'
import { shallowMount, ThisTypedShallowMountOptions } from '@vue/test-utils'
import DeviceCreatePage from '@/pages/create.vue'

Vue.use(Vuetify)

const mockAxiosPost = jest.fn()
const mockRouterPush = jest.fn()
const mountFunction = (options?: ThisTypedShallowMountOptions<any>) => {
  return shallowMount(DeviceCreatePage, {
    mocks: {
      $axios: {
        $post: mockAxiosPost,
      },
      $router: {
        push: mockRouterPush,
      },
    },
    ...options,
  })
}

describe('DeviceListPage', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  it('should call post redirect to home page on submit', async () => {
    const wrapper = await mountFunction()
    await wrapper.vm.onSubmit()
    await wrapper.vm.$nextTick
    expect(mockAxiosPost).toHaveBeenCalledWith(
      'http://localhost:5000/devices',
      {
        device: '',
        isCheckedOut: false,
        lastCheckedOutBy: '',
        manufacturer: '',
        os: '',
      }
    )

    await wrapper.vm.$nextTick
    expect(mockRouterPush).toHaveBeenCalledWith('/')
  })
})
