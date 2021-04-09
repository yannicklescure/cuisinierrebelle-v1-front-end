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
        :title="'Recettes Sociales !'"
        :description="'Partagez vos recettes dès maintenant en toute simplicité'"
        :image="'https://media.cuisinierrebelle.com/images/cr_icon_1200x1200.jpg'"
      />
      <Banner v-if="!isAuthenticated" />
      <Cards v-if="show" :recipes="recipes" />
      <Loading v-else />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
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
    show () {
      if (this.isAuthenticated) {
        return this.currentUser.likes && this.recipes.length > 0
      } else {
        return this.recipes.length > 0
      }
    }
  },
  methods: {
    ...mapActions({
      getStoreData: 'getStoreData'
    })
  }
}
</script>
