<template>
  <v-footer
    color="primary lighten-1"
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-col
        cols="auto"
        class="my-2"
      >
        <h3 class="whitetext" style="font-family: 'Arial', sans-serif;">
          &copy; {{ new Date().getFullYear() }} — All rights reserved
        </h3>
      </v-col>
      <v-col
        class="primary lighten-2 py-4 text-center white--text"
        cols="12"
      >
        <v-row justify="space-between">
          <v-col class="text-left">
            <strong>Vuetify</strong>
          </v-col>
          <v-col class="text-right">
            &copy; {{ new Date().getFullYear() }} — Hughes Systique Pvt. Ltd.
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-footer>
</template>

<style scoped>
.text-decoration-none {
  text-decoration: none;
}

.whitetext {
  color: white; 
}
</style>
