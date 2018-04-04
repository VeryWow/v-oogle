<template lang="pug">
  h1
    | H{{ sum }}LLO, cruel world!
    hr
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    data: () => ({
      a: 2,
      b: 1
    }),
    computed: {
      sum(): number {
        // Everything works right in development
        if (this.$isDevelopment) {
          return this.a + this.b;
        }
        // Everything breaks in production :D
        else {
          return this.a - this.b;
        }
      }
    }
  })
</script>

<style lang="scss">
  h1 {
    color: #35495e;

    hr {
      border-color: #41b883;
    }
  }
</style>
