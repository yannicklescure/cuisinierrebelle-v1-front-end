<template>
  <div ref="settings" class="container d-flex flex-column flex-grow-1 justify-content-between">
    <div>
      <div class="my-3">
        <NuxtLink
          :to="`/u/${ currentUser.slug }/photo`"
          :style="`display:block;height:96px;width:96px;background-image: url('${currentUser.image.preview.url}');background-size: cover;`"
          class="rounded img-fluid d-flex justify-content-center align-items-center text-decoration-none text-white"
          @click.native="hover = false"
          @mouseover.native="hover = true"
          @mouseleave.native="hover = false"
        >
          <span
            v-show="hover"
            class="material-icons md-48"
          >
            photo_camera
          </span>
        </NuxtLink>
      </div>
      <div class="h1 mb-3">
        {{ $t('userSettings.title') }}
      </div>
      <div class="d-flex flex-column mb-3">
        <NuxtLink :to="`/u/${ currentUser.slug }/photo`">
          {{ $t('users.settings.photo.title') }}
        </NuxtLink>
      </div>
      <div class="mb-3">
        <div class="h2 d-none">
          {{ $t('userSettings.emailPreferences') }}
        </div>
        <UsersNotifications />
        <UsersFreemium />
      </div>
    </div>
    <div class="mb-3">
      <NuxtLink
        :to="`/u/${ currentUser.slug }/delete`"
        class="btn btn-danger"
      >
        {{ $t('userSettings.deleteAccount') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UserSettings',
  layout: 'users',
  middleware: ['authentication', 'authorization'],
  data () {
    return {
      hover: false
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'users/sessions/user'
    })
  }
}
</script>
