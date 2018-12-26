// Css
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './css/site.css';

// Polyfill
import 'event-source-polyfill';
import 'es6-object-assign/auto';
import 'es6-promise/auto';

import Vue from 'vue';
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue';

import AppComponent from './components/app/app.component.vue';
import HomeComponent from './components/home/home.component.vue';

Vue.use(VueRouter);
Vue.use(BootstrapVue);

const routes = [
    { path: '/', component: HomeComponent },
];

new Vue({
    el: '#app-root',
    router: new VueRouter({ mode: 'history', routes: routes }),
    render: h => h(AppComponent)
});
