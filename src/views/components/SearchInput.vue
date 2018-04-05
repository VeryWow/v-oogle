<template lang="pug">
  form.search-input-component(
  ref="frm"
  onsubmit="return q.value!=''"
  action="https://google.com/search")
    vue-suggest(
    v-model="query"
    ref="suggestComponent"
    value-attribute="id"
    display-attribute="title"
    spellcheck="false"
    autocomplete="off"
    name="q"
    :debounce="100"
    :list="getList"
    :min-length="0"
    :destyled="true"
    @hide-list="onHideList"
    @select="onSelect")
      div(
      slot="suggestion-item"
      slot-scope="scope"
      :title="scope.suggestion.description")
        span(v-html="boldenSuggestion(scope)")

      //- div(
      //- slot="misc-item-below")
      //-   button Google search

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
      query: '',
      isSelected: false,
      defaultList: [
        {
          id: 1,
          title: 'vue-simple-suggest'
        },
        {
          id: 2,
          title: 'vue-simple-events'
        },
        {
          id: 3,
          title: 'vue-simple-headful'
        }
      ]
    }},
    methods: {
      onSelect(item) {
        if (item) {
          this.isSelected = true
        }
      },
      onHideList() {
        console.log('onHideList')
        if (this.isSelected) {
          this.$refs.frm['submit']()
          this.isSelected = false
        }
      },
      boldenSuggestion({ suggestion, query }) {
        let result = suggestion.title;
        if (!query) return result;

        const index = result.toLowerCase().indexOf(query.toLowerCase())

        if (!~index) {
          return result
        }

        const match = result.substr(query.length)
        result = result.replace(match, match.bold())

        return result;
      },
      getList (inputValue) {
        return new Promise((resolve, reject) => {
          if (!inputValue) {
            resolve([...this.defaultList])
            return
          }

          let url = `https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&namespace=*&search=${inputValue}&limit=10&namespace=0&format=json`
          fetch(url).then(response => {
            if (!response.ok) {
              reject()
            }
            response.json().then(json => {
              let autocompleteText = json.shift()
              autocompleteText = autocompleteText.trim()
              let result: any[] = []
              const fields = ['title', 'description', 'link']
              json.forEach((part, i) => {
                part.forEach((el, j) => {
                  if (!result[j]) {
                    result.push({
                      id: j+1
                    })
                  }
                  result[j][fields[i]] = el
                })
              })
              resolve(result.length ? result : [...this.defaultList])
              // resolve([...(json.items || [])])
            }).catch(e => {
              reject(e)
            })
          }).catch(error => {
            reject(error)
          })
        })
      }
    }
  })
</script>

<style lang="scss">
.search-input-component {
  position: relative;
  .input-wrapper {
    position: relative;
    z-index: 1;
  }
  input {
    width: 100%;
    border: none;
    font-size: 16px;
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

  .suggestions {
    background-color: #fff;
    box-shadow: 0 3px 8px 0 rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.08);
    border: none;
    z-index: 2;
    position: absolute;
    right: 0;
    left: 0;

    &, * {
      user-select: none;
    }

    .suggest-item {
      padding: 0 16px;
      line-height: 22px;
      cursor: pointer;

      &:hover, &.hover {
        background: #eee;
      }
    }
  }
}
</style>
