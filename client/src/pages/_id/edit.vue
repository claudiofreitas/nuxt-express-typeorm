<template>
  <v-form ref="form" v-model="isValid">
    <v-text-field
      v-model="device"
      :rules="deviceRules"
      label="Device"
      required
    />
    <v-text-field v-model="os" :rules="osRules" label="OS" required />
    <v-text-field
      v-model="manufacturer"
      :rules="manufacturerRules"
      label="Manufacturer"
      required
    />
    <v-checkbox v-model="isCheckedOut" label="Is the device checked out?" />
    <v-text-field
      v-if="isCheckedOut"
      v-model="lastCheckedOutBy"
      :rules="lastCheckedOutByRules"
      label="Device checked out by?"
      required
    />
    <v-btn
      type="submit"
      class="mr-4"
      color="success"
      :disabled="!isValid"
      @click.prevent="onSubmit"
    >
      submit
    </v-btn>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      isValid: false,
      device: '',
      deviceRules: [(v) => !!v || 'Device is required'],
      os: '',
      osRules: [(v) => !!v || 'OS is required'],
      manufacturer: '',
      manufacturerRules: [(v) => !!v || 'Manufacturer is required'],
      lastCheckedOutBy: '',
      lastCheckedOutByRules: [
        (v) =>
          (!!v && this.isCheckedOut) || 'Last checked out person is required',
      ],
      isCheckedOut: false,
    }
  },
  async mounted() {
    const path = `http://localhost:5000/devices/${this.$route.params.id}`
    const device = await this.$axios.$get(path)
    this.device = device.device
    this.os = device.os
    this.manufacturer = device.manufacturer
    this.lastCheckedOutBy = device.lastCheckedOutBy
    this.isCheckedOut = device.isCheckedOut
  },
  methods: {
    async onSubmit() {
      const path = `http://localhost:5000/devices/${this.$route.params.id}`
      await this.$axios.$patch(path, {
        device: this.device,
        os: this.os,
        manufacturer: this.manufacturer,
        lastCheckedOutBy: this.lastCheckedOutBy,
        isCheckedOut: this.isCheckedOut,
      })
      await this.$router.push(`/`)
    },
  },
}
</script>
