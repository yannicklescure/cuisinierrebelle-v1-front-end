<template>
  <div class="container">
    <div v-if="show" class="row p-3">
      <div v-for="(product, index) in products" :key="index" :class="['p-0 col-12 col-md-4 col-lg-3']">
        <Product :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Products',
  data () {
    return {
      data: [],
      show: false
    }
  },
  async fetch () {
    await this.$store.dispatch('users/authentication/isAuthenticated', null)
    // /v1/products
    this.data = await this.$axios.$get('/v1/products')
  },
  computed: {
    ...mapGetters({
      geolocation: 'users/authentication/geolocation'
    }),
    products () {
      if (this.geolocation.country === 'FR') {
        return this.data.filter(item => item.country === 'FR')
      } else {
        return this.data.filter(item => item.country !== 'FR')
      }
    }
  },
  mounted () {
    this.show = true
  }
}
</script>
