<template>
  <div class="container">
    <div class="h1 mb-3">
      {{ $t('userSettings.title') }}
    </div>
    <div class="mb-3">
      <img
        :src="currentUser.image.preview.url"
        height="96"
        width="96"
        class="rounded img-fluid"
        :alt="currentUser.slug"
      >
    </div>
    <div class="d-flex flex-column mb-3">
      <NuxtLink :to="`/u/${ currentUser.slug }/photo`">
        {{ $t('users.settings.photo.title') }}
      </NuxtLink>
      <NuxtLink :to="`/u/${ currentUser.slug }/delete`">
        {{ $t('userSettings.deleteAccount') }}
      </NuxtLink>
    </div>
    <div class="mb-3">
      <UsersNotifications />
      <UsersFreemium />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UserSettings',
  layout: 'users',
  middleware: ['authentication', 'authorization'],
  computed: {
    ...mapGetters({
      currentUser: 'users/sessions/user'
    })
  }
}
</script>
