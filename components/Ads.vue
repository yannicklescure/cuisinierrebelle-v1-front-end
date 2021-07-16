<template>
  <div v-if="!currentUser.freemium" class="w-100 my-3">
    <adsbygoogle
      :ad-style="{ display: 'block' }"
      ad-slot="2500166878"
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
