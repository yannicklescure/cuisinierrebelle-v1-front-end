<template>
  <div>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

const capitalize = (s) => {
  return typeof s !== 'string' ? '' : s.charAt(0).toUpperCase() + s.slice(1)
}

export default {
  name: 'RegistrationConfirmation',
  data () {
    return {
      message: null
    }
  },
  mounted () {
    if (this.$route.query.confirmation_token) {
      this.confirmRegistration()
    } else {
      this.$router.push({ path: '/login' })
    }
  },
  methods: {
    ...mapActions({
      registrationConfirmation: 'registrationConfirmation'
    }),
    confirmRegistration () {
      this.registrationConfirmation({ token: this.$route.query.confirmation_token })
        .then((response) => {
          if (response.status === 200) {
            this.$root.$bvToast.toast(this.$t('RegistrationConfirmation.success', { firstName: capitalize(response.data.first_name) }), {
              title: 'Cuisinier Rebelle',
              variant: 'info',
              solid: true
            })
            this.$router.push({ path: '/login' })
          } else {
            this.$root.$bvToast.toast(response.error, {
              title: 'Cuisinier Rebelle',
              variant: 'danger',
              solid: true
            })
            this.$router.push({ path: '/' })
          }
        })
    }
  }
}
</script>
