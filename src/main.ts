import { createApp } from 'vue';
import PhosphorVue from '@phosphor-icons/vue';
import App from './App.vue';
import './index.css';
import router from './router';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { getToken, loadInitialData } from './services';

async function initialize() {
  if (getToken()) {
    await loadInitialData();
  }
}

initialize()
  .catch((error) => {
    console.error(`Financial expenses init`, { error });
  })
  .finally(async () => {
    const app = createApp(App);
    app.use(PhosphorVue);
    app.component('Datepicker', Datepicker);
    app.use(router);
    app.mount('#app');
  });
