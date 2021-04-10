<template>
  <div class="d-flex flex-column flex-md-row justify-content-between">
    <div id="recipe-user" :class="[{'mb-0': $device.isMobile}, 'd-print-none d-flex align-items-center order-0']">
      <div class="d-flex flex-grow-1 m-0 align-items-center">
        <div class="d-flex flex-grow-1 flex-grow-md-0 justify-content-between justify-md-content-start align-items-center">
          <div class="d-flex order-0 justify-content-between justify-content-md-start flex-grow-1 align-items-center" data-user="1">
            <div class="mr-md-2 d-flex align-items-center">
              <NuxtLink
                :to="`/u/${ item.user.slug }`"
                class="text-body d-flex align-items-center"
                style="font-size: 90%"
              >
                <img
                  :src="item.user.image.thumb.url"
                  width="24px"
                  height="24px"
                  class="rounded-circle mr-2"
                  style="object-fit: cover;"
                >
                <div class="text-capitalize">
                  {{ item.user.name }}
                </div>
              </NuxtLink>
            </div>
            <div class="d-none mr-3 btn btn-dark btn-sm py-0">
              Follow
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-2">
      <img
        ref="lazyImage"
        class="recipe-image"
        :data-src="item.recipe.photo.full.url"
        :width="dimension.width"
        :height="dimension.height"
        :style="`object-fit: cover;border-radius: 4px`"
        :alt="item.recipe.slug"
      >
    </div>
    <div class="d-flex order-0 align-items-start justify-content-between my-2 mb-md-0 d-print-none">
      <div class="d-flex order-0 align-items-start">
        <BtnVisit :item="item" />
        <BtnComment :item="item" />
        <BtnShare :item="item" />
        <div v-if="isRecipeOwner" class="d-print-none ml-3">
          <NuxtLink :to="`/r/${item.recipe.slug}/edit`" class="text-body text-capitalize text-decoration-none">
            <i :class="['material-icons', 'md-32']">edit</i>
          </NuxtLink>
        </div>
      </div>
      <div class="d-flex order-1 align-items-end">
        <BtnLike :item="item" />
        <BtnBookmark :item="item" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Head',
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
    }),
    isRecipeOwner () {
      return this.item.user.id === this.currentUser.id
    }
  },
  mounted () {
    this.$refs.lazyImage.src = this.$refs.lazyImage.dataset.src
  }
}
</script>
