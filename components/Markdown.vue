<template lang="md">
  <div v-html="$md.render(source)"></div>
</template>

<script>
export default {
  props: {
    source: {
      type: String,
      default: null
    }
  }
}
</script>
