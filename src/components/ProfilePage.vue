<template>
  <div class="profile-container">
    <h2>User Profile</h2>
    <div v-if="user" class="profile-details">
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Phone:</strong> {{ user.phone }}</p>
      <p><strong>Age:</strong> {{ user.age }}</p>
      <p><strong>Role:</strong> {{ user.role }}</p>
      <p><strong>Employee Code:</strong> {{ user.id }}</p>
      <p><strong>Experience (in yrs):</strong> {{ user.exp }}</p>
      <p>
        <strong>Company Code:</strong> {{ user.c_id }}
        <v-btn v-if="!user.c_id" @click="dialog = true" rounded color="primary" dark>
          Create
        </v-btn>
      </p>
    </div>
    <div v-else>
      <p>Please Login to view Profile!</p>
      <router-link to="/login" class="text-decoration-none">
        <v-btn rounded color="primary" dark>Login</v-btn>
      </router-link>
    </div>

    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Create Company</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field v-model="companyData.c_name" label="Company Name"  @blur="v$.companyData.c_name.$touch()"
                      :error-messages="v$.companyData.c_name.$error ? 'Name is required' : ''"></v-text-field>
            <v-text-field v-model="companyData.c_email" label="Company Email"  @blur="v$.companyData.c_email.$touch()"
                      :error-messages="v$.companyData.c_email.$error ? 'Email is required' : ''"></v-text-field>
            <v-text-field v-model="companyData.c_phone" label="Company Phone"  @blur="v$.companyData.c_phone.$touch()"
                      :error-messages="v$.companyData.c_phone.$error ? 'Phone is required' : ''"></v-text-field>
            <v-text-field v-model="companyData.c_address" label="Company Address"  @blur="v$.companyData.c_address.$touch()"
                      :error-messages="v$.companyData.c_address.$error ? 'Address is required' : ''"></v-text-field>
            <v-text-field v-model="companyData.max_emp" label="Max Employees"  @blur="v$.companyData.max_emp.$touch()"
                      :error-messages="v$.companyData.max_emp.$error ? 'Max Employees is required' : ''"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="submitCompany">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import useVuelidate from '@vuelidate/core';
import { required,email } from '@vuelidate/validators';

export default {
  setup(){
   return {
    v$:useVuelidate()
  }
   },
  data() {
    return {
      dialog: false,
      companyData: {
        c_name: '',
        c_email: '',
        c_phone: '',
        c_address: '',
        max_emp: ''
      }
    };
  },
  validations(){
    return{
      companyData: {
        c_name: {required},
        c_email: {required,email},
        c_phone: {required},
        c_address:{required},
        max_emp:{required} 
      }
    }
  },
  computed: {
    user() {
      const user =  JSON.parse(localStorage.getItem('user'));
      if(user.c_id!=null){
        localStorage.setItem('userCId',user.c_id);
      }
      console.log('User c_id:', user.c_id);
      return user;
    }
  },
  methods: {
    ...mapActions(['createCompany']),
    async submitCompany() {
      try {
        const userId = localStorage.getItem('userId');
        const companyDataWithUserId = {
          ...this.companyData,
          user_id:userId
        };
        await this.createCompany(companyDataWithUserId);
        this.dialog = false;
        alert('Company created successfully!');
        
        
      } catch (error) {
        console.error('Error creating company:', error);
      }
    }
  }
};
</script>

<style scoped>
.profile-container {
  width: 100%;
  height: 100vh;
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

.profile-details {
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

.profile-details p {
  margin-bottom: 20px;
}

strong {
  display: inline-block;
  width: 150px;
  text-align: right;
  margin-right: 10px;
}
</style>
