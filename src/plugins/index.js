import installCommon from './common'
import installEvents from 'vue-simple-events'

const plugins = {
  install(Vue, options) {
    installCommon(Vue, options);
    Vue.use(installEvents);

    // Plugins should be enabled here
  }
}

export default plugins;

export { environment, isDevelopment } from './common'
