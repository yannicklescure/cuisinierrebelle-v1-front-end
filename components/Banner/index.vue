<template>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <client-only>
      <div
        ref="banner"
        :style="`background-image: linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url('${ imageUrl }')`"
        class="banner-background banner-height d-flex flex-column w-100 justify-content-between bg-light"
      >
        <BannerCta />
        <BannerUnsplash :image="image" />
      </div>
    </client-only>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Banner',
  async fetch () {
    const obj = this.$store.state.banner.image
    if (obj.id == null || !obj.timestamp || parseInt(new Date().getTime() - obj.timestamp) > 1000 * 60 * 60 * 24) {
      await this.getBannerImage()
    }
  },
  computed: {
    ...mapGetters({
      image: 'banner/image'
    }),
    viewport () {
      return {
        height: process.client ? Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) : 0,
        width: process.client ? Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) : 0
      }
    },
    imageUrl () {
      return process.client ? `${this.image.url}&w=${this.viewport.width}&h=${this.viewport.height}&fm=webp` : null
    }
  },
  methods: {
    ...mapActions({
      getBannerImage: 'banner/get'
    })
  }
}
</script>
