<template>
  <div id="signup-container" class="image-container">
    <img src="../assets/login.jpg" alt="Home Image" class="background-image">
    <div class="overlay-content">
      <v-stepper v-model="e1" class="signup-stepper">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1">
            User Details
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 2" step="2">
            Create Password
          </v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card class="signup-card">
              <div class="login-container">
                <form @submit.prevent="nextStep">
                  <div class="input-container">
                    <v-text-field
                      label="Name"
                      v-model="name"
                      placeholder="Enter your name"
                      @blur="v$.name.$touch()"
                      :error-messages="v$.name.$error ? 'Name is required' : ''"
                    ></v-text-field>
                  </div>
                  <div class="input-container">
                    <v-text-field
                      label="Email"
                      v-model="email"
                      @blur="v$.email.$touch()"
                      :error-messages="v$.email.$error ? 'Email is required' : ''"
                    ></v-text-field>
                    <div v-if="emailError" class="error-message">{{ emailError }}</div>
                  </div>
                  <div class="input-container">
                    <v-text-field
                      label="Phone"
                      v-model="phone"
                      @blur="v$.phone.$touch()"
                      :error-messages="v$.phone.$error ? 'Phone number is required' : ''"
                    ></v-text-field>
                  </div>
                  <v-btn color="primary" @click="nextStep">
                    Continue
                  </v-btn>
                  <v-btn text @click="resetForm">
                    Cancel
                  </v-btn>
                </form>
              </div>
            </v-card>
          </v-stepper-content>
          <v-stepper-content step="2">
            <v-card class="signup-card">
              <div class="login-container">
                <form @submit.prevent="signup">
                  <h2>Create Password</h2>
                  <div class="input-container">
                    <v-text-field
                      label="Password"
                      v-model="password"
                      type="password"
                      @blur="v$.password.$touch()"
                      :error-messages="v$.password.$error ? 'Password is required' : ''"
                    ></v-text-field>
                  </div>
                  <div class="input-container">
                    <v-text-field
                      label="Confirm Password"
                      v-model="confirmPassword"
                      type="password"
                      @blur="v$.confirmPassword.$touch()"
                      :error-messages="v$.confirmPassword.$error ? 'Confirm Password is required' : ''"
                    ></v-text-field>
                  </div>
                  <v-btn :disabled="!passwordsMatch" color="primary" type="submit">
                    Signup
                  </v-btn>
                  <v-btn text @click="e1 = 1">
                    Cancel
                  </v-btn>
                </form>
              </div>
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import { mapActions } from 'vuex';
import axios from 'axios';

const uniqueEmail = async (email) => {
  if (email === "") return true;
  try {
    const response = await axios.post('http://localhost:3000/users/checkemail', { email });
    return response.data.success !== 1;
  } catch (error) {
    console.error('Error checking email uniqueness:', error);
    return false;
  }
};

export default {
  setup() {
    return {
      v$: useVuelidate()
    };
  },
  data() {
    return {
      e1: 1,
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      emailError: ''
    };
  },
  validations() {
    return {
      e1: {},
      name: { required },
      email: { required, email },
      phone: { required },
      password: { required },
      confirmPassword: { required }
    };
  },
  computed: {
    passwordsMatch() {
      return this.password === this.confirmPassword;
    }
  },
  methods: {
    async nextStep() {
      if (this.name && this.email && this.phone) {
        const isUnique = await uniqueEmail(this.email);
        if (isUnique) {
          this.emailError = '';
          this.e1++;
        } else {
          this.emailError = 'Email already exists';
        }
      } else {
        alert('Please fill in all the fields.');
      }
    },
    resetForm() {
      this.e1 = 1;
      this.name = '';
      this.email = '';
      this.phone = '';
      this.password = '';
      this.confirmPassword = '';
      this.emailError = '';
    },
    ...mapActions(['signupUser']),
    async signup() {
      if (!this.passwordsMatch) {
        alert('Passwords do not match.');
        return;
      }

      const userData = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        password: this.password
      };

      try {
        await this.signupUser(userData);
        alert('Signup successful');
        this.$router.push('/login');
      } catch (error) {
        console.error('Error creating user:', error.response ? error.response.data : error.message);
        alert('Error during signup. Please try again.');
      }
    }
  }
};
</script>

<style scoped>
.signup-stepper {
  width: 50%;
  margin: 5% auto;
}

.signup-card {
  padding: 20px;
}

.input-container {
  margin-bottom: 20px;
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.v-text-field {
  width: 100%;
}

.overlay-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.1);
  text-align: center;
}

.image-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.error-message {
  color: red;
  font-size: 0.875rem;
  margin-top: -20px;
}
</style>
