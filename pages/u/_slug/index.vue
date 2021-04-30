<template>
  <div>
    <div v-if="$fetchState.pending">
      <Loading />
    </div>
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
  layout: 'users',
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
      // users: 'users/list',
      timestamp: 'timestamp'
    }),
    socialMetaData () {
      return {
        title: this.user.name,
        description: 'Partagez vos recettes dès maintenant en toute simplicité',
        image: this.user.image.openGraph.url
      }
    },
    user () {
      const userNull = {
        id: 0,
        slug: '',
        name: '',
        checked: null,
        followers: {
          count: 0,
          data: []
        },
        following: {
          count: 0,
          data: []
        },
        image: {
          full: {
            url: ''
          },
          preview: {
            url: ''
          },
          openGraph: {
            url: ''
          },
          thumb: {
            url: ''
          }
        },
        createdAt: 0
      }

      const userData = this.usersFilter(this.$route.params.slug)
      return userData !== undefined ? userData : userNull
    },
    userRecipes () {
      return this.getUserRecipes(this.$route.params.slug)
    }
  },
  // watch: {
  //   $route () {
  //     this.$fetch()
  //   }
  // },
  methods: {
    ...mapActions({
      getUser: 'users/getUser',
      getStoreData: 'getStoreData'
    })
  }
}
</script>
