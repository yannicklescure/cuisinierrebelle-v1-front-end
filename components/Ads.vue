<template>
  <div v-if="!currentUser.freemium" class="w-100 my-3">
    <adsbygoogle
      :ad-style="{ display: 'block' }"
      :ad-format="'auto'"
      :ad-slot="adSlot"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Ads',
  props: {
    adSlot: {
      type: String,
      default: null
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'users/sessions/user'
    })
  }
}

</script>
