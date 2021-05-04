<template>
  <div ref="card" class="card">
    <CardHead :item="item" />
    <CardBody :item="item" :dimension="dimension" />
    <LazyCardFooter :item="item" />
  </div>
</template>

<script>

export default {
  name: 'Card',
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      dimension: {
        width: 0,
        height: 0
      }
    }
  },
  mounted () {
    this.$emit('cardReady', this.item.recipe.id)
    this.$nextTick(async () => {
      await this.matchInfoBox()
      window.addEventListener('resize', this.matchInfoBox)
    })
  },
  methods: {
    matchInfoBox () {
      this.dimension.width = this.$refs.card.clientWidth
      this.dimension.height = parseInt(this.dimension.width * 2 / 3)
    }
  }
}
</script>

<style>
</style>
