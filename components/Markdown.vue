<template lang="md">
  <div v-html="$md.render(source)" class="text-break"></div>
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
