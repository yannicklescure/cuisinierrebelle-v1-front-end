<template>
  <div>
    <div class="custom-control custom-switch">
      <input
        id="Freemium"
        type="checkbox"
        class="custom-control-input"
        :checked="checked"
        @click="toggle"
      >
      <!-- <label class="custom-control-label" for="Freemium">{{ checked ? $t('userSettings.freemium.delete') :$t('userSettings.freemium.add') }}</label> -->
      <label class="custom-control-label" for="Freemium">{{ $t('userSettings.freemium.delete') }}</label>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UserFreemium',
  computed: {
    ...mapGetters({
      currentUser: 'users/sessions/user'
    }),
    checked () {
      return this.currentUser.freemium
    }
  },
  methods: {
    async toggle () {
      const payload = {
        id: this.currentUser.id,
        freemium: !this.checked === true ? 'true' : 'false'
      }
      await this.$store.dispatch('users/sessions/freemium', payload)
    }
  }
}
</script>
