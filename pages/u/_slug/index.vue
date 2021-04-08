<template>
  <div>
    <nuxt keep-alive />
    <SocialHead
      :title="socialMetaData.title"
      :description="socialMetaData.description"
      :image="socialMetaData.image"
    />
    <UsersBanner :user="user" />
    <Cards v-if="recipes.length > 0" :recipes="userRecipes" />
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
    let refresh = true
    if (this.timestamp != null) {
      refresh = new Date().getTime() - this.timestamp > 60 * 1000 * 3
    }
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
