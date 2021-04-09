<template>
  <div class="container">
    <div v-if="$fetchState.error">
      <NotFound />
    </div>
    <div
      v-else
      :key="componentKey"
      class="container"
    >
      <SocialHead
        :title="item.title"
        :description="'Partagez vos recettes dès maintenant en toute simplicité'"
        :image="'https://media.cuisinierrebelle.com/images/cr_icon_1200x1200.jpg'"
      />
      <div v-if="!$device.isMobile && currentUser.admin" class="d-flex justify-content-center align-items-center my-3">
        <NuxtLink :to="`/p/${ $route.params.slug }/edit`" class="text-body text-capitalize text-decoration-none">
          {{ $t('pages.edit') }}
        </NuxtLink>
      </div>
      <div>
        <Markdown :source="item.content" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Page',
  data () {
    return {
      componentKey: 0,
      item: {
        content: ''
      }
    }
  },
  async fetch () {
    await this.fetchItems()
    this.item = this.page(this.$route.params.slug)
  },
  computed: {
    ...mapGetters({
      page: 'pages/filter',
      currentUser: 'users/sessions/user'
    })
  },
  methods: {
    ...mapActions({
      fetchItems: 'pages/get'
    })
  }
}
</script>
