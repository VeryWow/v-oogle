import { PluginObject } from 'vue'

import installCommon from './common'
import installEvents from 'vue-simple-events'

const plugins: PluginObject<any> = {
  install(Vue, options) {
    installCommon(Vue, options);
    Vue.use(installEvents);

    // Plugins should be enabled here
  }
}

export default plugins;

export { environment, isDevelopment } from './common'
