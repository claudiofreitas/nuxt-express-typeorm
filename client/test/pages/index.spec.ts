import Vuetify from 'Vuetify'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import DeviceListPage from '@/pages/index.vue'

const localVue = createLocalVue()
let vuetify: Vuetify

beforeEach(() => {
  vuetify = new Vuetify()
})

const mountFunction = (options: object) => {
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
  test('is a Vue instance', () => {
    const wrapper = mountFunction({})

    expect(wrapper.vm).toBeTruthy()
  })
})
