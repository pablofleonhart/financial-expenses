import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from "./router";
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { apolloClient } from './lib/apollo';
import { createApolloProvider } from '@vue/apollo-option'

// Create a provider
const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})

const app = createApp(App)
app.use(apolloProvider)
app.component('Datepicker', Datepicker);
app.use(router);
app.mount('#app');
