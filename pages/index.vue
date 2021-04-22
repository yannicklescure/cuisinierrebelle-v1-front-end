<template>
  <div>
    <div v-if="$fetchState.pending">
      <Loading />
    </div>
    <div v-else-if="$fetchState.error">
      <NotFound />
    </div>
    <div v-else>
      <SocialHead
        :title="socialMetaData.title"
        :description="socialMetaData.description"
        :image="socialMetaData.image"
      />
      <client-only>
        <Banner v-if="!isAuthenticated" />
        <div>
          <Cards v-if="show" :recipes="recipes" />
          <Loading v-else />
        </div>
      </client-only>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
  layout: 'recipes',
  async fetch () {
    const refresh = this.timestamp !== null ? new Date().getTime() - this.timestamp > 60 * 1000 * 3 : true
    if (refresh) {
      await this.getStoreData()
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'users/authentication/isAuthenticated',
      currentUser: 'users/sessions/user',
      recipes: 'recipes/listSorted',
      timestamp: 'timestamp'
    }),
    socialMetaData () {
      return {
        title: 'Cuisinier Rebelle, Recettes Sociales !',
        description: 'Partagez dès maintenant vos recettes en toute simplicité',
        image: 'https://media.cuisinierrebelle.com/images/cr_icon_1200x1200.jpg'
      }
    },
    show () {
      // if (this.isAuthenticated) {
      // return this.currentUser.likes && this.recipes.length > 0
      return this.recipes.length > 0
      // } else if (process.client) {
      // console.log(window.scrollY)
      // return window.scrollY > 0
      // } else {
      //   return false
      // }
    }
  },
  methods: {
    ...mapActions({
      getStoreData: 'getStoreData'
    })
  }
}
</script>
