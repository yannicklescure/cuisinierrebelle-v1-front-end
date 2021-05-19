<template>
  <div :class="['card-footer border-0 bg-white p-0']">
    <CardMobileCta :item="item" />
    <div :class="['d-flex flex-column', $device.isMobile ? 'p-0' : 'p-0']">
      <NuxtLink
        :to="`/r/${ item.recipe.slug }`"
        class="card-link text-body font-weight-normal"
      >
        {{ item.recipe.title }}
      </NuxtLink>
      <div class="card-text font-weight-light">
        {{ item.recipe.description }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardFooter',
  props: {
    item: {
      type: Object,
      default: null
    }
  }
}
</script>
