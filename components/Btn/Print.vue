<template>
  <div id="print" class="mouse-pointer text-decoration-none text-body" @click="print">
    <i class="material-icons md-18 d-flex btn-print">print</i>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  name: 'BtnPrint',
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  methods: {
    googleAdsNoPrint () {
      const googleAutoPlacedAds = this.$el.querySelectorAll('.google-auto-placed')
      if (googleAutoPlacedAds) {
        googleAutoPlacedAds.forEach((googleAutoPlacedAd) => {
          googleAutoPlacedAd.classList.add('d-print-none')
        })
      // } else {
        // console.log('no ads')
      }
    },

    print () {
      this.googleAdsNoPrint()
      window.print()
    }
  }
}
</script>
