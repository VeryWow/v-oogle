<template lang="pug">
  form.search-input-component(
  ref="frm",
  onsubmit="return !!q.value",
  @submit="add(equalSuggestion ? equalSuggestion : { id: query.hashCode(), title: query })"
  action="https://google.com/search")
    vue-suggest(
    ref="suggestComponent",
    value-attribute="id",
    display-attribute="title",
    :debounce="100",
    :list="getList",
    :min-length="0",
    :destyled="true",
    @focus="$emit('focus', $event)",
    @blur="$emit('blur', $event)",
    @select="submitForm")
      input.default-input(v-model="query",
      spellcheck="false",
      autocomplete="off",
      name="q")

      div(
      slot="suggestion-item",
      slot-scope="{ suggestion }",
      :title="suggestion.description")
        span(v-html="boldenSuggestion({ suggestion, query })", :class="{ visited: !!suggestion.visited }")
        a(v-if="suggestion.visited", @click.stop.prevent="remove(suggestion)", style="float:right", href="#")
          | remove

      div.buttons-container.list(slot="misc-item-below", slot-scope="{ suggestions }", v-if="suggestions.length > 0")
        v-oogle-button(:has-query="!!query")
        v-oogle-button(feeling-lucky, :has-query="!!query")

    input(name="sourceid", value="navclient", type="hidden")

    div.buttons-container
      v-oogle-button(:has-query="!!query")
      v-oogle-button(feeling-lucky, :has-query="!!query")
</template>

<script lang="ts">
  import Vue from 'vue'
  import VueSuggest from 'vue-simple-suggest/lib'

  import VOogleButton from './VoogleButton.vue'

  import { StorageAccess } from 'plugins/storage'

  const storage = new StorageAccess('[]');
  const storageKey = 'lol-history';
  const maxLength = 6;

  const visitedKey = 'visited';

  const records: any[] = (storage.get(storageKey) as any[]).sort((a, b) => 0 - (a[visitedKey] - b[visitedKey]));

  export default Vue.extend({
    components: {
      VueSuggest,
      VOogleButton
    },
    data() {
      return {
        query: '',
        selected: null,
        records
      }
    },
    computed: {
      equalSuggestion() {
        return this['$refs'].suggestComponent.suggestions.find(s => s.title === this['query']);
      }
    },
    methods: {
      submitForm(suggestion) {
        this.selected = suggestion;
        this.add(this.selected);
        this.$nextTick(() => {
          if (suggestion.title) {
            this.query = suggestion.title
          }

          this.$refs.frm['submit']()
        })
      },
      add(suggestion) {
        if (suggestion) {
          if (this.records.length < maxLength) {
            let rec: any = this.records.find(r => r.id === suggestion.id);

            if (!rec) {
              rec = { ...suggestion };
              rec[visitedKey] = 1;
              this.records.push(rec);
            } else {
              rec[visitedKey]++;
            }

            storage.set(storageKey, this.records);
          }
        }
      },
      remove(suggestion) {
        const result = this.records.filter(r => r.id !== suggestion.id);
        storage.set(storageKey, result);
        this.$set(this, 'records', result);
        this.$refs.suggestComponent['research']()
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
            resolve(this.records)
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
              const fields = ['title', 'description']
              json.forEach((part, i) => {
                part.forEach((el, j) => {
                  if (!result[j]) {
                    result.push({
                      id: j+1
                    })
                  }
                  if (fields[i]) {
                    result[j][fields[i]] = el
                  }
                })
              })
              const records = this.records.filter(r => r.title.toLowerCase().startsWith(inputValue.toLowerCase()));
              result = result.filter(item => records.every(r => r.id !== item.id && r.title !== item.title))
              resolve(records.concat(result.length ? result : []))
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

  .vue-simple-suggest {
    position: relative;

    .input-wrapper {
      position: relative;
      z-index: 1;
    }

    .default-input {
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
      margin-bottom: 18px;
      background-color: #fff;
      box-shadow: 0 3px 8px 0 rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.08);
      border: none;
      z-index: 2;
      position: absolute;
      right: 0;
      left: 0;
      top: calc(100% - 1px);

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

        .visited {
          color: #551A8B;
          font-weight: bold;
        }
      }
    }
  }

  .buttons-container {
    padding-top: 18px;
    text-align: center;

    &.list {
      padding-top: 10px;

      button {
        height: 30px;
      }
    }
  }
}

@media screen and (max-device-width: 679px) {
  .vue-simple-suggest {
    // position: sticky;
    // top: 0;

    // .default-input {
    //   position: sticky;
    //   top: 0;
    // }

    .suggestions .suggest-item {
      padding: 12px 16px !important;

      span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: block;
        width: 100%;
      }

      &:not(:last-of-type) {
        border-bottom: 1px solid #dedede;
      }
    }

    .buttons-container.list {
      display: none;
    }
  }
}
</style>
