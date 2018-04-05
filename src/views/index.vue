<template lang="pug">
.v-oogle
  .logo-box(:class="{ 'move-up': inputFocused }")
    div
      a(href="https://github.com/VeryWow/v-oogle")
        img(
        alt="V-oogle"
        title="Because why not?"
        :src="logo")
  .search-box
    search-input.search(@focus="inputFocused = true", @blur="inputFocused = false")
</template>

<script lang="ts">
  //@ts-ignore
  import SearchInput from 'components/SearchInput.vue'
  // import logo from '~/v-oogle.png'

  import Vue from 'vue'
  export default Vue.extend({
    components: {
      SearchInput
    },
    data: () => ({
      inputFocused: false
    }),
    computed: {
      logo() {
        return require('~/v-oogle.png');
      }
    }
  })
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  font-family: arial,sans-serif;
}

.v-oogle {
  .logo-box {
    margin-top: 89px;
    text-align: center;

    div {
      user-select: none;
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

@media screen and (min-device-width: 680px) {
  html {
    min-width: 980px;
  }
}

@media screen and (max-device-width: 679px) {
  html {
    padding: 10px;
  }
  .v-oogle {
    .logo-box {
      margin-top: 0;
      transition: margin .15s ease;

      div {
        padding-top: 40px;
      }

      &.move-up {
        margin-top: -160px;
      }
    }
    .search-box {
      .search {
        width: 100%;
      }
    }
  }
}
</style>
