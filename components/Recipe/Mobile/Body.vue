<template>
  <div>
    <div class="my-4 order-1 order-md-1 d-flex flex-column justify-content-center align-items-center">
      <div class="text-center">
        <div class="h1">
          {{ item.recipe.title }}
        </div>
        <div v-if="item.recipe.subtitle" class="h2 text-secondary">
          {{ item.recipe.subtitle }}
        </div>
      </div>
    </div>
    <Markdown :source="item.recipe.direction" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Body',
  props: {
    item: {
      type: Object,
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
