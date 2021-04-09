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
      <label class="custom-control-label" for="Notifications">{{ $t('userSettings.getEmailNotifications') }}</label>
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
    toggle () {
      const payload = {
        id: this.currentUser.id,
        notification: !this.checked
      }
      this.$store
        .dispatch('users/sessions/notifications', payload)
    }
  }
}
</script>
