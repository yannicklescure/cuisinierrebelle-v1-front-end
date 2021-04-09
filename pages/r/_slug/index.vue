<template>
  <div ref="recipe" class="container py-3 mb-5 recipe">
    <SocialHead
      :title="socialMetaData.title"
      :description="socialMetaData.description"
      :image="socialMetaData.image"
    />
    <RecipeHead :item="item" />
    <RecipeBody :item="item" :dimension="dimension" />

    <LazyYoutube :item="item" />

    <LazyBtnSocialSharing v-if="$device.isMobile == false" :item="item" />

    <div class="w-100 my-5">
      <LazyRecipeAds />
    </div>

    <LazyOtherRecipes v-if="recipes.length > 2" :recipes="recipes" />

    <client-only>
      <Comments :item="item" @refresh="$fetch" />
    </client-only>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

const truncate = (str, n) => {
  return (str.length > n) ? str.substr(0, n - 1) + '&hellip;' : str
}

export default {
  name: 'Recipe',
  // async asyncData ({ $axios, params }) {
  //   return { item: await $axios.$get(`/v1/recipes/${params.slug}`) }
  // },
  data () {
    return {
      dimension: {
        width: 0,
        height: 0
      }
    }
  },
  async fetch () {
    // TO DO
    // check if recipe exists in store or fetch
    await this.getRecipe(this.$route.params.slug)
    const refresh = this.timestamp !== null ? new Date().getTime() - this.timestamp > 60 * 1000 * 3 : true
    if (refresh) {
      await this.getStoreData()
    }
  },
  computed: {
    ...mapGetters({
      // recipe: 'recipes/recipe',
      recipes: 'recipes/list',
      timestamp: 'timestamp'
    }),
    item () {
      const position = this.recipes.findIndex(item => item.recipe.slug === this.$route.params.slug)
      return position > -1 ? this.recipes[position] : undefined
    },
    socialMetaData () {
      return {
        title: this.item.recipe.title,
        description: truncate(this.item.recipe.description, 160),
        image: this.item.recipe.photo.openGraph.url
      }
    }
  },
  mounted () {
    this.$store.commit('recipes/recipe', this.item)
    this.$nextTick(async () => {
      await this.matchInfoBox()
      window.addEventListener('resize', this.matchInfoBox)
    })
  },
  methods: {
    ...mapActions({
      getRecipe: 'recipes/recipe',
      getStoreData: 'getStoreData'
    }),
    refresh () {
      this.$fetch()
    },
    matchInfoBox () {
      if (this.$refs.recipe) {
        this.dimension.width = this.$refs.recipe.clientWidth
        this.dimension.height = parseInt(this.dimension.width * 2 / 3)
      }
    }
  }
}
</script>
