<template>
  <div>
    <CardMobile v-if="$device.isMobile" :item="item" />
    <CardDesktop v-else :item="item" />
  </div>
</template>

<script>

export default {
  name: 'Card',
  props: {
    item: {
      type: Object,
      default: null
    }
  }
}
</script>
