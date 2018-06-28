// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import store from './store'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueLocalStorage from 'vue-localstorage'
import 'vue2-autocomplete-js/dist/style/vue2-autocomplete.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSubway, faBus, faTrain } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSubway);
library.add(faBus);
library.add(faTrain);

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueLocalStorage);
Vue.use(BootstrapVue);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
