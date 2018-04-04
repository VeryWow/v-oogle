import Vue from 'vue'

import views from 'views'
import plugins from 'plugins'

Vue.use(plugins);

new Vue({
  el: 'app',
  render: views
});

