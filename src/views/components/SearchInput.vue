<template lang="pug">
  form(@submit.prevent="submitLink")
    vue-suggest(
      v-model="query"
      :destyled="true"
    )
    button(type="submit" style="display:none")
</template>

<script lang="ts">
  import Vue from 'vue'
  import VueSuggest from 'vue-simple-suggest/lib'

  export default Vue.extend({
    components: {
      VueSuggest
    },
    data() { return {
      query: ''
    }},
    methods: {
      submitLink() {
        location.replace('https://google.com/search?q=' + this['query']);
      }
    }
  })
</script>
