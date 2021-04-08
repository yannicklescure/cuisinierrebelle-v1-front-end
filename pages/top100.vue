<template>
  <div>
    <Cards v-if="recipes.length > 0" :recipes="recipes" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Top100',
  middleware: 'authenticated',
  async fetch () {
    let refresh = true
    if (this.timestamp != null) {
      refresh = new Date().getTime() - this.timestamp > 60 * 1000 * 3
    }
    if (refresh) {
      await this.getStoreData()
    }
  },
  computed: {
    ...mapGetters({
      recipes: 'recipes/top100',
      timestamp: 'timestamp'
    })
  },
  methods: {
    ...mapActions(['getStoreData'])
  }
}
</script>
