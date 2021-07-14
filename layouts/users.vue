<template>
  <div id="default" ref="default" class="d-flex flex-column h-100 justify-content-between align-items-between">
    <client-only>
      <NavbarMobile v-if="$device.isMobile" />
      <NavbarDesktop v-else />
    </client-only>
    <Nuxt keep-alive />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Users',
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
      this.$refs.default.style.marginTop = `${parseInt(this.navbarHeight)}px`
      this.$refs.default.style.minHeight = `calc(100vh - ${parseInt(this.navbarHeight)}px)`
    }
  }
}
</script>
