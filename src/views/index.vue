<template lang="pug">
.v-oogle
  .logo-box
    img(alt="Google" src="https://www.google.ru/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png")
  .search-box
    search-input.search
</template>

<script lang="ts">
  import Vue from 'vue'
  import SearchInput from './components/SearchInput.vue'

  export default Vue.extend({
    components: {
      SearchInput
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

    img {
      padding-top: 109px;
      display: block;
      margin: 0 auto;
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
