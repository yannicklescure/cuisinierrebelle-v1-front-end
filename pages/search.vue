<template>
  <div>
    <div v-if="$fetchState.pending">
      <Loading />
    </div>
    <div v-else-if="$fetchState.error">
      <NotFound />
    </div>
    <div v-else>
      <Cards v-show="show" :recipes="recipes" />
      <div v-show="!show" class="container">
        <div class="py-3" v-html="$t('search.noResult', { query: $route.query.r })" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Search',
  async fetch () {
    await this.$store.dispatch('search/query', { query: this.$route.query.r })
  },
  computed: {
    ...mapGetters({
      navbarHeight: 'navbarHeight',
      recipes: 'search/result'
    }),
    show () {
      return this.recipes.length > 0
    }
  },
  watch: {
    $route (to, from) {
      this.$fetch()
    }
  }
}
</script>
