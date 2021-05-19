<template>
  <div class="card-header bg-white px-0 pb-2 border-0">
    <div class="d-flex justify-content-start align-items-center">
      <NuxtLink
        :to="`/u/${ item.user.slug }`"
        class="text-body d-flex align-items-center"
        style="font-size: 90%"
      >
        <img
          :src="item.user.image.thumb.url"
          width="24"
          height="24"
          class="rounded-circle mr-2"
          style="object-fit: cover;"
        >
        <div class="text-capitalize">
          {{ item.user.name }}
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CardHead',
  props: {
    item: {
      type: Object,
      default: null
    }
  }
}
</script>
