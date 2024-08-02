import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

function getUserFromLocalStorage() {
  const user = localStorage.getItem('user');
  if (user === 'undefined' || user === null) {
    return null;
  }
  try {
    return JSON.parse(user);
  } catch (error) {
    console.error(error);
    return null;
  }
}

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default new Vuex.Store({
  state: {
    user: getUserFromLocalStorage(),
    token: localStorage.getItem('token') || null,
    users: [],
    companies: [],
    company: null,
    permissions: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    setUsers(state, users) {
      state.users = users;
    },
    setCompanies(state, companies) {
      state.companies = companies;
    },
    setCompany(state, company) {
      state.company = company;
    },
    addUser(state, user) {
      state.users.push(user);
    },
    updateUser(state, updatedUser) {
      const index = state.users.findIndex(user => user.id === updatedUser.id);
      if (index !== -1) {
        Vue.set(state.users, index, updatedUser);
      }
    },
    deleteUser(state, userId) {
      state.users = state.users.filter(user => user.id !== userId);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    setPermissions(state, permissions) {
      state.permissions = permissions;
    }
  },
  actions: {
    setUser({ commit }, user) {
      commit('setUser', user);
    },
    setToken({ commit }, token) {
      commit('setToken', token);
    },
    logout({ commit }) {
      commit('logout');
    },
    async fetchUsers({ commit }) {
      try {
        const response = await api.get('/users');
        commit('setUsers', response.data.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async fetchCompanies({ commit }) {
      try {
        const response = await api.get('/company');
        commit('setCompanies', response.data.data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    },
    async createCompany({ dispatch }, companyData) {
      try {
        await api.post('/company', companyData);
        dispatch('fetchCompanies');
      } catch (error) {
        console.error('Error creating company:', error);
      }
    },
    async createUser({ commit }, userData) {
      try {
        const response = await api.post('/users', userData);
        commit('addUser', response.data.data);
      } catch (error) {
        console.error('Error creating user:', error);
      }
    },
    async updateUser({ commit }, userData) {
      try {
        const response = await api.put(`/users/${userData.id}`, userData);
        commit('updateUser', response.data.data);
      } catch (error) {
        console.error('Error updating user:', error);
      }
    },
    async deleteUser({ commit }, userId) {
      try {
        await api.delete(`/users/${userId}`);
        commit('deleteUser', userId);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },
    async fetchUsersByCId({ commit }) {
      try {
        const response = await api.get(`/users/userbycid`);
        commit('setUsers', response.data.data);
      } catch (error) {
        console.error('Error fetching users by company ID:', error);
      }
    },
    async fetchCompanyDetails({ commit }) {
      try {
        const response = await api.get(`/company/`);
        commit('setCompany', response.data.data);
      } catch (error) {
        console.error('Error fetching company details:', error);
      }
    },
    async fetchPermissions({ commit }) {
      try {
        const response = await api.get(`/company/role`);
        commit('setPermissions', response.data.data.permissions);
      } catch (error) {
        console.error('Error fetching permissions:', error);
      }
    }
  },
  getters: {
    user: state => state.user,
    token: state => state.token,
    users: state => state.users,
    companies: state => state.companies,
    company: state => state.company,
    permissions: state => state.permissions
  }
});
