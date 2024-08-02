<template>
    <div id="div" class="image-container">
      <img id="img" src="../assets/homepic.jpg" alt="Home Image">
      <div class="overlay-content">
        <h1>HSC Employee Portal</h1>
        <p>Welcome to our website!</p>
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
    top: 20px;
    right: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    color: white;
    text-align: right;
  }
  
  h1 {
    margin: 0;
    font-size:4em; 
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
  }
  
  p {
    margin-top: 10px;
    font-size: 2em; 
    font-family:cursive 
  }
  </style>
  