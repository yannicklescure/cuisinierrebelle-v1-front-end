<template>
  <div ref="card" class="card">
    <div class="card-body bg-white p-0">
      <div
        :style="`width: ${dimension.width}px; height: ${dimension.height}px; background-image: url('${item.recipe.photo.card.url}');background-size: cover;`"
        :class="['card-img-top d-flex justify-content-start align-items-end']"
        @mouseenter="show = true"
        @mouseleave="show = false"
      >
        <transition name="slide">
          <div
            v-if="show"
            ref="navbar"
            class="navbar w-100 p-3 d-flex justify-content-between align-items-center"
            style="background-color: rgba(0,0,0,0.5);"
          >
            <NuxtLink :to="`/r/${ item.recipe.slug }`">
              <div
                v-b-tooltip.hover
                class="d-inline-block text-truncate text-white"
                :style="`max-width: ${dimension.width * 0.7}px`"
                :title="item.recipe.title"
              >
                {{ item.recipe.title }}
              </div>
            </NuxtLink>
            <div
              class="d-flex bg-white justify-content-center align-items-center rounded-circle"
              style="height: 40px; width: 40px;"
            >
              <BtnBookmark :item="item" />
            </div>
          </div>
        </transition>
      </div>
    </div>
    <div :class="['card-footer border-0 bg-white p-0']">
      <div class="d-flex justify-content-between align-items-center my-2">
        <div class="d-flex justify-content-start align-items-center">
          <NuxtLink
            :to="`/u/${ item.user.slug }`"
            class="text-body text-decoration-none d-flex align-items-center"
            style="font-size: 90%"
          >
            <img
              :src="item.user.image.thumb.url"
              width="24"
              height="24"
              class="rounded-circle mr-2"
              style="object-fit: cover;"
            >
            <div class="text-capitalize font-weight-bold">
              {{ item.user.name }}
            </div>
          </NuxtLink>
        </div>
        <div :class="['d-flex justify-content-between', $device.isMobile ? 'align-items-start' : 'align-items-center']">
          <BtnLike :item="item" />
          <BtnVisit :item="item" class="ml-3" />
          <!-- <BtnComment :item="item" /> -->
          <!-- <BtnShare :item="item" /> -->
          <!-- <BtnBookmark :item="item" /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  // name: 'Card',
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      dimension: {
        width: 0,
        height: 0
      },
      show: false
    }
  },
  mounted () {
    this.$emit('cardReady', this.item.recipe.id)
    this.$nextTick(async () => {
      await this.matchInfoBox()
      window.addEventListener('resize', this.matchInfoBox)
    })
  },
  methods: {
    matchInfoBox () {
      this.dimension.width = this.$refs.card.clientWidth
      this.dimension.height = parseInt(this.dimension.width * 2 / 3)
    }
  }
}
</script>

<style>
  .slide-enter-active,
  .slide-leave-active {
    transition: max-height .3s ease;
    max-height: 1000px;
  }

  .slide-enter-to, .slide-leave {
     max-height: 1000px;
     overflow: hidden;
  }

  .slide-enter, .slide-leave-to {
     overflow: hidden;
     max-height: 0;
  }
</style>
