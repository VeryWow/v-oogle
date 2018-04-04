const envProps = {
  '$environment': {
    get() {
      return process.env.NODE_ENV;
    }
  },
  '$isDevelopment': {
    get() {
      return process.env.NODE_ENV === 'development';
    }
  }
};

const env = Object.defineProperties({}, envProps);

const commonPlugins = (Vue, options) => {
  // Define node environment shorthands on the Vue prototype
  Object.defineProperties(Vue.prototype, envProps);

  // Configure Vue
  Vue.config.productionTip = false;
  Vue.config.devtools = Vue.prototype.$isDevelopment;
  Vue.config.performance = !Vue.config.devtools;
}


export const environment = env.$environment;
export const isDevelopment = env.$isDevelopment;

export default commonPlugins;
