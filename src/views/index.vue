<template lang="pug">
.v-oogle
  .logo-box
    img(src="https://www.google.ru/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png")
    //- img(
    //-   alt="Google"
    //-   height="92"
    //-   src="https://www.google.ru/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
    //-   style="padding-top:109px"
    //-   width="272")
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

      input {
        width: 100%;
        border: none;
        font: 16px arial,sans-serif;
        line-height: 34px;
        outline: none;

        padding: 6px 9px 4px 16px;
        background-color: #fff;
        vertical-align: top;
        border-radius: 2px;
        box-shadow: 0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);
        transition: box-shadow 200ms cubic-bezier(0.4, 0.0, 0.2, 1);

        &:hover, &:focus {
          box-shadow: 0 3px 8px 0 rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.08);
        }
      }
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
