<template>
  <div>
    <RecipeMobileHead :item="item" :dimension="dimension" />
    <RecipeMobileBody :item="item" />
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
