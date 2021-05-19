<template>
  <div>
    <div class="mb-4">
      <img
        ref="lazyImage"
        class="recipe-image my-3 d-print-none"
        :src="item.recipe.photo.full.url"
        :width="dimension.width"
        :height="dimension.height"
        :style="`object-fit: cover;`"
        :alt="item.recipe.slug"
      >
    </div>
    <div class="mb-4">
      <RecipeDesktopHead :item="item" />
    </div>
    <div class="my-5 order-1 order-md-1 d-flex flex-column justify-content-center align-items-center">
      <div class="d-none d-print-block my-3 text-center">
        &nbsp;www.CuisinierRebelle.com&nbsp;
      </div>
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
  props: {
    item: {
      type: Object,
      default: null
    },
    dimension: {
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
