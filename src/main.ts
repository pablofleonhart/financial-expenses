import { createApp, provide, h } from 'vue'
import App from './App.vue'
import './index.css'
import router from "./router";
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { DefaultApolloClient } from '@vue/apollo-composable'
import { apolloClient } from './lib/apollo';

const app = createApp({
  setup () {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})

app.component('Datepicker', Datepicker);
app.use(router);
app.mount('#app');
