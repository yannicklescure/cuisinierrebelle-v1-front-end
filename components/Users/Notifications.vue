<template>
  <div>
    <div class="custom-control custom-switch">
      <input
        id="Notifications"
        type="checkbox"
        class="custom-control-input"
        :checked="checked"
        @click="toggle"
      >
      <!-- <label class="custom-control-label" for="Notifications">{{ checked ? $t('userSettings.emailNotifications.delete') :$t('userSettings.emailNotifications.add') }}</label> -->
      <label class="custom-control-label" for="Notifications">{{ $t('userSettings.emailNotifications.text') }}</label>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UserNotifications',
  computed: {
    ...mapGetters({
      currentUser: 'users/sessions/user'
    }),
    checked () {
      return this.currentUser.notification
    }
  },
  methods: {
    async toggle () {
      const payload = {
        id: this.currentUser.id,
        notification: !this.checked === true ? 'true' : 'false'
      }
      await this.$store.dispatch('users/sessions/notifications', payload)
    }
  }
}
</script>
