<template>
  <v-card flat tile>
    <v-toolbar class="primary lighten-1"> 
      <router-link to="/profile" class="text-decoration-none">
        <v-icon large class="mr-2">mdi-account</v-icon>
      </router-link>
      <v-toolbar-title id="title">
        {{ user ? `Hi ${user.name}` : 'HSC Portal' }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-img src="../assets/hsc-logo.png" contain height="60px" width="50px"></v-img>
      <v-spacer></v-spacer>
      
      <div>
        <router-link v-for="link in links" :key="link.name" :to="link.path" class="text-decoration-none">
          <v-btn color="white" text rounded>
            {{ link.name }}
          </v-btn>
        </router-link>
      </div>
      
      <v-btn icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-toolbar>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    links: [
      { name: 'Home', path: '/' },
      { name: 'About Us', path: '/aboutus' },
      { name: 'Users', path: '/users' },
      { name: 'Login', path: '/login' },
      {name:'Signup',path:'/signup'}
    ],
  }),
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
#title {
  font-family: fantasy;
}
.text-decoration-none {
  text-decoration: none;
}
</style>
