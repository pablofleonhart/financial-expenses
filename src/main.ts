import { createApp } from 'vue';
import PhosphorVue from 'phosphor-vue';
import App from './App.vue';
import './index.css';
import router from './router';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { apolloClient } from './lib/apollo';
import { ApolloProvider, createApolloProvider } from '@vue/apollo-option';
import { loadInitialData } from './services';

let apolloProvider: ApolloProvider;

async function initialize() {
  // Create a provider
  apolloProvider = createApolloProvider({
    defaultClient: apolloClient,
  });
  await loadInitialData();
}

initialize()
  .catch((error) => {
    console.error(`Financial expenses init`, { error });
  })
  .finally(async () => {
    const app = createApp(App);
    if (apolloProvider) {
      app.use(apolloProvider);
    }
    app.use(PhosphorVue);
    app.component('Datepicker', Datepicker);
    app.use(router);
    app.mount('#app');
  });
