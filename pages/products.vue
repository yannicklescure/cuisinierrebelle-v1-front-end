<template>
  <div class="container">
    <div v-if="show" class="row">
      <div v-for="(product, index) in products" :key="index" :class="['p-2 col-12 col-md-4 col-lg-3']">
        <div class="card d-flex flex-column flex-grow-1 justify-content-between" style="height: 100%">
          <div class="d-flex flex-column">
            <img
              :src="product.image.src"
              alt=""
              width="100%"
              style="object-fit: cover"
            >
            <div class="mt-2 font-weight-normal">
              {{ product.title }}
            </div>
            <div class="font-weight-light mt-2">
              {{ product.description }}
            </div>
          </div>
          <a :href="product.link" target="_blank" class="mt-2 btn btn-info d-flex justify-content-center align-items-center">
            <span class="mr-2 material-icons md-18">
              open_in_new
            </span>
            {{ product.provider }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Products',
  data () {
    return {
      list: {
        france: [
          {
            title: 'Marmite en fonte émaillée Sitram 5L',
            description: "Ultra résistante cocotte fabriquée en fonte d'acier émaillé fondue d'un seul bloc Cocotte compatible toutes sources de chaleur y compris induction four sans limite de température Idéale pour préparer de délicieux plats mijotés à base de viande de poisson ou de légumes.",
            image: {
              src: 'https://images-na.ssl-images-amazon.com/images/I/81H57WgSkCL._AC_SL1500_.jpg'
            },
            link: 'https://amzn.to/3w3ryrU',
            provider: 'Amazon'
          }
        ],
        international: [
          {
            title: 'Marmite en fonte émaillée Lodge 6L',
            description: "Une combinaison parfaite de forme et de fonction qui ne s'arrête pas, le Lodge Dutch Oven est un classique en fonte émaillée idéal pour préparer et servir des repas mémorables.",
            image: {
              src: 'https://images-na.ssl-images-amazon.com/images/I/71tN09vv0jL._AC_SL1500_.jpg'
            },
            link: 'https://amzn.to/3bp1GP0',
            provider: 'Amazon'
          }
        ]
      },
      show: false
    }
  },
  async fetch () {
    await this.$store.dispatch('users/authentication/isAuthenticated', null)
  },
  computed: {
    ...mapGetters({
      geolocation: 'users/authentication/geolocation'
    }),
    products () {
      return this.geolocation.country === 'FR' ? this.list.france : this.list.international
    }
  },
  mounted () {
    this.show = true
  }
}
</script>
