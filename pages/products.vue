<template>
  <div class="container">
    <div v-if="show" class="row p-3">
      <div v-for="(product, index) in products" :key="index" :class="['p-0 col-12 col-md-4 col-lg-3']">
        <product :product="product" />
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
          },
          {
            title: 'Fouet danois',
            description: 'Ce fouet danois est plus efficace et plus rapide que les fouets traditionnels. Adaptée pour mélanger les pâtes épaisses comme par exemple les pâtes à pain, pâtes à gâteaux et même des purées.',
            image: {
              src: 'https://images-na.ssl-images-amazon.com/images/I/71--8um8JML._AC_SL1500_.jpg'
            },
            link: 'https://amzn.to/2RZF0OL',
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
          },
          {
            title: 'Fouet danois',
            description: 'Ce fouet danois est plus efficace et plus rapide que les fouets traditionnels. Adaptée pour mélanger les pâtes épaisses comme par exemple les pâtes à pain, pâtes à gâteaux et même des purées.',
            image: {
              src: 'https://images-na.ssl-images-amazon.com/images/I/71--8um8JML._AC_SL1500_.jpg'
            },
            link: 'https://amzn.to/3frjydf',
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
