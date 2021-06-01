<template>
  <div>
    <client-only>
      <Banner v-if="!isAuthenticated" />
    </client-only>
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
        <Cards v-if="show" :recipes="recipes" />
        <Loading v-else />
      </client-only>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
  layout: 'recipes',
  data () {
    return {
      refresh: true
    }
  },
  async fetch () {
    this.refresh = this.timestamp !== null ? new Date().getTime() - this.timestamp > 60 * 1000 * 3 : true
    if (this.refresh === true) {
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
      return this.recipes.length > 0
    }
  },
  watch: {
    $route (to, from) {
      this.$fetch()
    }
  },
  methods: {
    ...mapActions({
      getStoreData: 'getStoreData'
    })
  }
}
</script>
