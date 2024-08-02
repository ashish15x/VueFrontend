<template>
  <v-card
    class="py-8 px-6 text-center mx-auto ma-4"
    elevation="12"
    max-width="400"
    width="100%"
  >
    <h3 class="text-h6 mb-4">Verify Your Account</h3>

    <div class="text-body-2">
      Enter the OTP received in your email inbox to verify
      <br>
    </div>

    <v-sheet color="surface">
      <v-otp-input
        v-model="otp"
        type="password"
        solo
        @blur="v$.otp.$touch()"
        :error-messages="v$.otp.$error ? 'Otp is required' : ''"
      ></v-otp-input>
      <div class="errorClass" v-if="v$.otp.$error">Otp is required</div>
      <div class="errorClass" v-if="serverError">{{ serverError }}</div>
    </v-sheet>

    <v-btn
      class="my-4"
      primary
      height="40"
      width="70%"
      color="blue"
      @click="verifyOtp"
    >
      Verify
    </v-btn>
  </v-card>
</template>
<script>
import axios from 'axios';
import { mapActions } from 'vuex';
import VueJwtDecode from 'vue-jwt-decode';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';

export default {
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  data() {
    return {
      otp: '',
      serverError: ''
    };
  },
  validations() {
    return {
      otp: { required }
    };
  },
  methods: {
    ...mapActions(['setUser', 'setToken']),
    async verifyOtp() {
      this.v$.$touch();


      try {
        const response = await axios.post('http://localhost:3000/users/verifyotp', {
          email: localStorage.getItem('email'),
          otp: this.otp
        });

        if (response.status !== 200) {
          throw new Error('OTP verification failed');
        }

        const { token, user } = response.data;
        console.log(token, user);
        let decoded = VueJwtDecode.decode(token);
        const c_id = decoded.c_id;
        const userId = decoded.id;
        const role = decoded.role;
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('userId', userId);
        localStorage.setItem('c_id', c_id);
        this.setUser(user);
        this.setToken(token);
        this.$router.push('/profile');
      } catch (error) {
        this.serverError = 'OTP verification failed';
        
        console.error('OTP verification failed:', error.message);
      }
    }
  }
};
</script>
<style scoped>
.errorClass{
  color:red;
}
</style>