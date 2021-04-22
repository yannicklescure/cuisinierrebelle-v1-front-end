<template>
  <tr class="d-flex justify-content-between align-items-center">
    <td class="d-flex justify-content-start align-items-center">
      <NuxtLink :to="`/u/${ item.slug }`" class="text-capitalize text-body d-flex align-items-center">
        <img
          :src="item.image.thumb.url"
          :alt="item.name"
          class="mr-2 rounded-circle"
          width="32"
          height="32"
          style="object-fit: cover;"
        >
        {{ item.name }}
      </NuxtLink>
    </td>
    <td>
      <BtnFollow v-if="item.slug !== currentUser.slug" :item="item" />
    </td>
  </tr>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UsersCard',
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'users/sessions/user'
    })
  }
}
</script>
