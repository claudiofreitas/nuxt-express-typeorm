<template>
  <v-app dark>
    <header class="ma-4">
      <v-row>
        <v-col>
          <v-btn block to="/">List Devices</v-btn>
        </v-col>
        <v-col>
          <v-btn block to="/create">Create Device</v-btn>
        </v-col>
      </v-row>
    </header>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>
