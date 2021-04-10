<template>
  <div>
    <RecipeDesktopBody :item="item" :dimension="dimension" />
  </div>
</template>

<script>
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
  }
}
</script>
