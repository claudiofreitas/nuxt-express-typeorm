<template>
  <div>
    <v-card class="mx-auto" tile>
      <v-card-title>{{ device }}</v-card-title>
      <v-card-text>
        <div>
          <div>OS: {{ os }}</div>
          <div>Manufacturer: {{ manufacturer }}</div>
        </div>
        <div class="mb-2">Last Checkout Date: {{ lastCheckedOutDate }}</div>
      </v-card-text>
      <v-card-actions class="mx-4">
        <v-text-field
          v-model="lastCheckedOutBy"
          label="Checkout By:"
          required
        />
        <v-btn color="deep-purple lighten-2" text @click="onCheckout">
          Checkout
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="mx-auto" tile>
      <v-form ref="form" v-model="isValid" class="ma-6 pa-4">
        User Feedback
        <v-text-field v-model="userName" label="User Name" required />
        <v-textarea v-model="comment" label="Comment" required />
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
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isValid: false,
      device: '',
      os: '',
      manufacturer: '',
      lastCheckedOutBy: '',
      lastCheckedOutDate: '',
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
    this.lastCheckedOutDate = device.lastCheckedOutDate
    this.isCheckedOut = device.isCheckedOut
  },
  methods: {
    onCheckout() {},
    onSubmit() {},
  },
}
</script>
