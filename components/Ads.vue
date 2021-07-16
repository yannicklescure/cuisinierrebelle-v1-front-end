<template>
  <div v-if="!currentUser.freemium" class="w-100 my-3">
    <adsbygoogle
      :ad-style="{ display: 'block' }"
      ad-slot="9731748072"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Ads',
  computed: {
    ...mapGetters({
      currentUser: 'users/sessions/user'
    })
  }
}

</script>
