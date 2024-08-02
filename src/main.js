import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router';
import HomePage from './components/HomePage.vue';
import AboutUs from './components/AboutUs.vue';
import UsersPage from './components/UsersPage.vue'
import LoginForm from './components/LoginForm.vue'
import PageNotFound from './components/PageNotFound.vue'
import store from './store/store'
import SignupPage from './components/SignupPage.vue'
import ProfilePage from './components/ProfilePage.vue'
import CompanyPage from './components/CompanyPage.vue'
import OtpPage from './components/OtpPage.vue'
import PermissionsPage  from './components/PermissionsPage.vue'


Vue.use(VueRouter);
Vue.config.productionTip = false

const routes=[
  {
      name:'Home',
      path:'/',
      component:HomePage
  },
  {
      name:'User',
      path:'/users',
      component:UsersPage
  },
  {
    name:'AboutUS',
    path:'/aboutus',
    component:AboutUs
  },
  {
    name:'LoginForm',
    path:'/login',
    component:LoginForm
  },
  {
    name:'SignupPage',
    path:'/signup',
    component:SignupPage
  },
  {
    name:'ProfilePage',
    path:'/profile',
    component:ProfilePage
  },
  {
    name:'CompanyPage',
    path:'/company',
    component:CompanyPage
  },
  {
    name:'OtpPage',
    path:'/otp',
    component:OtpPage
  },
  {
    name:'PermissionsPage',
    path:'/roles',
    component: PermissionsPage
  },
  {
    name:'PageNotFound',
    path:'/:PathMatch(.*)*',
    component:PageNotFound
  },

];
const router = new VueRouter({  mode: 'history',routes})

new Vue({
  vuetify,
  store,
  router:router,
  render: h => h(App)
}).$mount('#app')


