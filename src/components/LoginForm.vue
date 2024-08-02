<template>
  <div id="div" class="image-container">
    <img id="img" src="../assets/homepic.jpg" alt="Home Image">
    <div class="overlay-content">
      <div class="login-container">
        <form @submit.prevent="login">
          <h2>Login</h2>
          <div class="input-container">
            <label for="email">email</label>
            <input type="text" id="email" v-model="email" required />
          </div>
          <div class="input-container">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" required />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';



export default {
  name: "HomePage",
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    ...mapActions(['setUser', 'setToken']),
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/users/login', {
          email: this.email,
          password: this.password
        });
        localStorage.setItem('email',this.email);
        // const { token, user } = response.data;

        // console.log(token,user)
        // let decoded = VueJwtDecode.decode(token)
        // const c_id = decoded.c_id;
        // const userId=decoded.id;
        // localStorage.setItem('token', token);
        // localStorage.setItem('role', user.role);
        // localStorage.setItem('user', JSON.stringify(user));
        // localStorage.setItem('userId', userId);
        // localStorage.setItem('c_id', c_id);
        // console.log("c_id:",c_id)
        // this.setUser(user);
        // this.setToken(token);
        console.log('Login successful:', response.data);
        this.$router.push('/otp');
      } catch (error) {
        console.error('Login failed:', error.message);
      }
    }
  }
};
</script>

<style scoped>
.image-container {
  position: relative;
  width: 100%;
  height: 80vh;
  overflow: hidden; 
}

#img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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

.login-container {
  max-width: 600px;
  margin-left: 500px;
  padding: 50px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  background-color: #fff;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.input-container {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #3f51b5;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #303f9f;
}
</style>
