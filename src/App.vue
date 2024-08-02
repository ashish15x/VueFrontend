<template>
  <v-app>
    <HeaderComponent></HeaderComponent>
    <v-main class="main-container">
      <v-container fluid class="fill-height">
        <v-row>
          <!-- <v-col cols="12" md="3">
            <NavigationDrawer />
          </v-col> -->
          <!-- <v-col cols="12" md="9"> -->
            <router-view></router-view>
          <!-- </v-col> -->
        </v-row>
      </v-container>
    </v-main>
    <FooterComponent></FooterComponent>
  </v-app>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue';
// import NavigationDrawer from './components/NavigationDrawer.vue';
import FooterComponent from './components/FooterComponent.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    // NavigationDrawer,
    FooterComponent,
  },
};
</script>

<style>
html, body, #app, .v-application {
  height: 100%;
  margin: 0;
}

.main-container {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.fill-height {
  flex: 1 0 auto;
}

v-main {
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
}

v-footer {
  flex-shrink: 0;
}
</style>
