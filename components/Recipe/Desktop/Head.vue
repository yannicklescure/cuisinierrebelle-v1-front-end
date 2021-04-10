<template>
  <div class="d-flex flex-column flex-md-row justify-content-between">
    <div id="recipe-user" :class="['d-print-none d-flex align-items-center order-0']">
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
    <div v-if="isRecipeOwner" class="d-print-none">
      <NuxtLink :to="`/r/${item.recipe.slug}/edit`" class="btn btn-sm btn-info">
        {{ $t('recipe.edit') }}
      </NuxtLink>
    </div>
    <div class="d-flex order-0 justify-content-between d-print-none">
      <div class="d-flex align-items-center justify-content-end order-1 w-100">
        <div class="d-flex order-1 align-items-center">
          <BtnVisit :item="item" />
          <BtnPrint :item="item" />
          <BtnLike :item="item" />
          <BtnBookmark :item="item" />
        </div>
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
      default: () => {}
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'users/sessions/user'
    }),
    isRecipeOwner () {
      return this.item.user.id === this.currentUser.id
    }
  }
}
</script>
