<template>
    <div id="div" class="image-container">
      <img id="img" src="../assets/404.png" alt="Home Image">
      <div class="overlay-content">

 <div id="btn" class="text-center">
  
    <router-link to="/" class="text-decoration-none">
    <v-btn
      rounded
      color="primary"
      dark
    >
      Back to HomePage
    </v-btn>
    </router-link>
  </div>


      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "HomePage"
  }
  </script>
  
  <style scoped>
  .image-container {
    position: relative;
    width: 100%;
    height: 100vh;
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
    color: white; 
    /* background: rgba(0, 0, 0, 0.5); */
    text-align: center;
  }
  
  h1 {
    margin: 0;
  }
  
  p {
    margin-top: 10px;
  }
  #btn{
    margin-top: 300px;
  }
  </style>
  