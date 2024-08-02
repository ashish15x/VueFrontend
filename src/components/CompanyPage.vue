<template>
  <div class="company-container">
    <h2>Company Info</h2>
    <div v-if="company" class="company-details">
      <p><strong>Id:</strong> {{ company.c_id }}</p>
      <p><strong>Name:</strong> {{ company.c_name }}</p>
      <p><strong>Email:</strong> {{ company.c_email }}</p>
      <p><strong>Phone:</strong> {{ company.c_phone }}</p>
      <p><strong>Address:</strong> {{ company.c_address }}</p>
      <p><strong>Max Employees:</strong> {{ company.max_emp }}</p>
    </div>
    <div v-else>
      <p>Please Login to view Company Info!</p>
      <router-link to="/login" class="text-decoration-none">
        <v-btn rounded color="primary" dark>Login</v-btn>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'CompanyDetails',
  data() {
    return {
      error: null,
    };
  },
  computed: {
    ...mapState(['company']),
  },
  created() {
    this.fetchCompanyDetails();
  },
  methods: {
    ...mapActions(['fetchCompanyDetails']),
  },
};
</script>

<style scoped>
.company-container {
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom right, #e0eafc, #cfdef3);
  font-family: Arial, sans-serif;
}

h2 {
  font-size: 2.5em;
  margin-bottom: 20px;
  margin-top: 10px;
}

.company-details {
  font-size: 1.2em;
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 700px;
  margin-bottom: 40px;
  text-align: left;
}

.company-details p {
  margin-bottom: 20px;
}

strong {
  display: inline-block;
  width: 150px;
  text-align: right;
  margin-right: 10px;
}
</style>
