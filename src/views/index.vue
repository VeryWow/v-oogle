<template lang="pug">
.v-oogle
  .logo-box
    div
      a(href="https://github.com/VeryWow/v-oogle")
        img(
          alt="V-oogle"
          title="Because why not?"
          :src="logo"
        )
  .search-box
    search-input.search
</template>

<script lang="ts">
  import Vue from 'vue'
  import SearchInput from './components/SearchInput.vue'
  // import logo from '~/v-oogle.png'

  export default Vue.extend({
    components: {
      SearchInput
    },
    computed: {
      logo() {
        return require('../assets/v-oogle.png');
      }
    }
  })
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  font-family: arial,sans-serif;
}

html {
  min-width: 980px;
}

.v-oogle {
  .logo-box {
    margin-top: 89px;
    text-align: center;

    div {
      padding-top: 109px;
      display: block;
      margin: 0 auto;
      width: 272px;

      img {
        display: block;
      }
    }
  }

  .search-box {
    margin-top: 28px;
    .search {
      width: 484px;
      margin: 0 auto;
    }
  }
}

@media screen and (min-width: 1250px) {
  .v-oogle {
    .search-box {
      .search {
        width: 584px;
      }
    }
  }
}
</style>
