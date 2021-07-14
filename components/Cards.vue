<template>
  <div class="container-fluid pt-2 px-md-5">
    <div class="row">
      <div v-for="(item, index) in items" :key="index" class="col-12 col-md-4 col-lg-3">
        <Card :item="item" />
      </div>
      <InfiniteScroll :enough="enough" @load-more="getData()">
        <template v-if="busy">
          <Loading />
        </template>
      </InfiniteScroll>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cards',
  props: {
    recipes: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      busy: false,
      items: [],
      enough: false,
      page: 1,
      pageSize: 10
    }
  },
  watch: {
    recipes () {
      this.items = []
      this.enough = false
      this.page = 1
      this.pageSize = 10
      this.getData()
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.busy = true
      const qty = this.items.length + 12 > this.recipes.length ? this.recipes.length - this.items.length : 12
      if (qty !== 12) {
        this.enough = true
      }
      this.items = this.items.concat(this.recipes.slice(this.items.length, this.items.length + qty))
      this.busy = false
    }
  }
}
</script>
