<template lang="pug">
  button.v-oogle-button(:type="type()", :name="name()", :onclick="click()")
    | {{ value() }}
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    props: {
      feelingLucky: {
        type: Boolean,
        default: false
      },
      hasQuery: {
        type: Boolean,
        required: true
      }
    },
    methods: {
      name() {
        return this['feelingLucky'] ? 'btnI' : 'btnK'
      },
      value() {
        return this['feelingLucky'] ? 'I\'m Feeling Lucky' : 'V-oogle Search'
      },
      type() {
        return this['hasQuery'] ? 'submit' : 'button'
      },
      click() {
        return this.feelingLucky ? 'window.open("https://www.google.com/doodles", "_self")' : null
      }
    }
  })
</script>

<style lang="scss">
  .v-oogle-button {
    height: 36px;
    line-height: 27px;
    background-image: gradient(linear,left top,left bottom,from(#f5f5f5),to(#f1f1f1));
    background-image: linear-gradient(top,#f5f5f5,#f1f1f1);
    border-radius: 2px;
    user-select: none;
    background-color: #f2f2f2;
    border: 1px solid #f2f2f2;
    border-radius: 2px;
    color: #757575;
    font-size: 13px;
    font-weight: bold;
    margin: 11px 4px;
    min-width: 54px;
    padding: 0 16px;
    text-align: center;
    transition: all .05s;

    &:hover {
      background-image: gradient(linear,left top,left bottom,from(#f8f8f8),to(#f1f1f1));
      background-image: linear-gradient(top,#f8f8f8,#f1f1f1);
      background-color: #f8f8f8;
      box-shadow: 0 1px 1px rgba(0,0,0,0.1);
      border: 1px solid #c6c6c6;
      color: #222;
    }

    &:focus {
      border: 1px solid #4d90fe;
	    outline: none;
    }
  }
</style>
