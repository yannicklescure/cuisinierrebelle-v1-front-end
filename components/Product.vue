<template>
  <div ref="product" class="card p-2 d-flex flex-column flex-grow-1 justify-content-between" style="height: 100%">
    <div class="d-flex flex-column">
      <img
        :src="product.image.card.url"
        alt=""
        :width="dimension.width"
        :height="dimension.height"
        style="object-fit: cover"
        class="card-img-top"
      >
      <div class="mt-2 font-weight-normal">
        {{ product.title }}
      </div>
      <div class="font-weight-light mt-2">
        {{ product.description }}
      </div>
    </div>
    <a :href="product.url" target="_blank" class="mt-2 btn btn-info d-flex justify-content-center align-items-center">
      <span class="mr-2 material-icons md-18">
        open_in_new
      </span>
      {{ product.provider }}
    </a>
  </div>
</template>

<script>

export default {
  name: 'Product',
  props: {
    product: {
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
    this.$nextTick(async () => {
      await this.matchInfoBox()
      window.addEventListener('resize', this.matchInfoBox)
    })
  },
  methods: {
    matchInfoBox () {
      if (this.$refs.product) {
        this.dimension.width = this.$refs.product.clientWidth - 16
        this.dimension.height = parseInt(this.dimension.width * 2 / 3)
      }
    }
  }
}
</script>
