<template>
  <v-card class="mx-auto" width="500" tile>
    <v-list-item v-for="device in devices" :key="device.id">
      <v-list-item-content>
        <v-list-item-title>
          <a :href="'/' + device.id">{{ device.device }}</a>
        </v-list-item-title>
        <v-list-item-subtitle>OS: {{ device.os }}</v-list-item-subtitle>
        <v-list-item-subtitle>
          Manufacturer: {{ device.manufacturer }}
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          Checked out date: {{ device.lastCheckedOutDate }}
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          Last checked out by: {{ device.lastCheckedOutBy }}
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn ref="edit" icon @click="onEdit(device.id)">
          <v-icon color="grey lighten-1">mdi-pencil</v-icon>
        </v-btn>
      </v-list-item-action>
      <v-list-item-action>
        <v-btn icon @click="onDelete(device.id)">
          <v-icon color="grey lighten-1">mdi-delete</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-card>
</template>

<script lang="ts">
import { Device } from '../types/device'

interface DataType {
  devices: Device[]
}

export default {
  data(): DataType {
    return {
      devices: [],
    }
  },
  async mounted(): Promise<void> {
    this.devices = await this.$axios.$get('http://localhost:5000/devices')
  },
  methods: {
    async onEdit(id: number) {
      await this.$router.push(`/${id}/edit`)
    },
    async onDelete(id: string) {
      await this.$axios.$delete(`http://localhost:5000/devices/${id}`)
      this.devices = this.devices.filter((device) => {
        return device.id !== id
      })
    },
  },
}
</script>
