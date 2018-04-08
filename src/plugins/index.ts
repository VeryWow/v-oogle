import { PluginObject } from 'vue'

import installCommon from './common'
import installEvents from 'vue-simple-events'

const plugins: PluginObject<any> = {
  install(Vue, options) {
    installCommon(Vue, options);
    Vue.use(installEvents);

    // Plugins should be enabled here
    String.prototype['hashCode'] = function() {
        var hash = 0;
        if (this.length == 0) {
            return hash;
        }
        for (var i = 0; i < this.length; i++) {
            var char = this.charCodeAt(i);
            hash = ((hash<<5)-hash)+char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }
  }
}

export default plugins;

export { environment, isDevelopment } from './common'
