<template>
  <div id="default" ref="default">
    <div class="d-flex flex-column justify-content-between align-items-between">
      <NavbarMobile v-if="$device.isMobile" />
      <NavbarDesktop v-else />
      <Nuxt />
      <LazyFooter />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      navbarHeight: 'navbarHeight'
    })
  },
  watch: {
    'navbarHeight' () {
      this.adjustDivTop()
    }
  },
  mounted () {
    this.adjustDivTop()
  },
  methods: {
    adjustDivTop () {
      this.$refs.default.style.paddingTop = `${parseInt(this.navbarHeight)}px`
      this.$refs.default.style.minHeight = '100vh'
    }
  }
}
</script>
