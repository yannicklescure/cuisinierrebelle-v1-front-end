<template>
  <div>
    <p v-if="$fetchState.pending">
      <span>{{ $t('init.loading') }}</span>
    </p>
    <div v-else-if="$fetchState.error">
      <NotFound />
    </div>
    <div v-else>
      <nuxt keep-alive />
      <SocialHead
        :title="socialMetaData.title"
        :description="socialMetaData.description"
        :image="socialMetaData.image"
      />
      <UsersBanner :user="user" />
      <Cards v-if="recipes.length > 0" :recipes="userRecipes" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'User',
  // async asyncData ({ $axios, params }) {
  //   return { item: await $axios.$get(`/v1/users/${params.slug}`) }
  // },
  async fetch () {
    await this.getUser(this.$route.params.slug)
    const refresh = this.timestamp !== null ? new Date().getTime() - this.timestamp > 60 * 1000 * 3 : true
    if (refresh) {
      await this.getStoreData()
    }
  },
  computed: {
    ...mapGetters({
      recipes: 'recipes/list',
      getUserRecipes: 'recipes/user',
      usersFilter: 'users/filter',
      users: 'users/list',
      timestamp: 'timestamp'
    }),
    user () {
      return this.usersFilter(this.$route.params.slug)
      // return this.item.data
    },
    userRecipes () {
      return this.getUserRecipes(this.$route.params.slug)
    },
    socialMetaData () {
      return {
        title: this.user.name,
        description: 'Partagez vos recettes dès maintenant en toute simplicité',
        image: this.user.image.openGraph.url
      }
    }
  },
  methods: {
    ...mapActions({
      getUser: 'users/getUser',
      getStoreData: 'getStoreData'
    })
  }
}
</script>
