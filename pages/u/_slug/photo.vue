<template>
  <div class="container">
    <div class="py-3 d-flex flex-column justify-content-center">
      <form @input="allowPost" @touchend="allowPost">
        <div class="h1 mb-3">
          {{ $t('users.settings.photo.title') }}
        </div>
        <div ref="photo" class="form-group mb-3">
          <div class="custom-file">
            <input
              id="photoFileLangHTML"
              type="file"
              class="custom-file-input"
              @change="processFile($event)"
            >
            <label class="custom-file-label" for="photoFileLangHTML" :data-browse="$t('users.settings.photo.chooseFile')">{{ $t('users.settings.photo.browse') }}</label>
          </div>
        </div>
        <div ref="preview" class="d-flex justify-content-center mb-3" />
        <div class="d-flex justify-content-end">
          <button
            type="submit"
            :class="['btn btn-dark mb-3', { 'w-100': $device.isMobile }]"
            :disabled="disabled"
            @click.stop.prevent="postPicture"
          >
            {{ $t('users.settings.photo.submit') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import imageCompression from 'browser-image-compression'

export default {
  name: 'UserPicture',
  layout: 'users',
  middleware: ['authentication', 'authorization'],
  data () {
    return {
      disabled: true,
      errors: [],
      photo: null
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'users/sessions/user'
    })
  },
  mounted () {
    // this.navbarHeight = this.getNavbarHeight()
    this.$refs.preview.innerHTML = ''
    this.$refs.preview.insertAdjacentHTML('afterbegin', `<img src="${this.currentUser.image.preview.url}" width="256" height="256" class="rounded img-fluid" alt="${this.currentUser.slug}">`)
  },
  methods: {
    async processFile (event) {
      const imageFile = event.target.files[0]
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: false
      }
      try {
        const compressedFile = await imageCompression(imageFile, options)
        this.photo = await new File([compressedFile], imageFile.name, {
          lastModifiedDate: imageFile.lastModified,
          type: imageFile.type
        })
        const reader = new FileReader()
        reader.onload = () => {
          this.$refs.preview.innerHTML = ''
          this.$refs.preview.insertAdjacentHTML('afterbegin', `<div class="mb-3"><img src="${reader.result}" width="256" height="256" class="rounded img-fluid" alt="${this.photo.name}"></div>`)
        }
        reader.readAsDataURL(this.photo)
      } catch (error) {
        // console.log(error)
      }
      this.allowPost()
    },
    allowPost () {
      if (this.photo) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    },
    checkForm () {
      this.errors = []
      if (!this.photo) {
        this.errors.push(this.$t('users.settings.photo.errors'))
        return false
      }
      return true
    },
    async postPicture () {
      const checkForm = this.checkForm()
      if (checkForm) {
        // console.log(this)
        this.disabled = true
        const payload = {
          image: this.photo
        }
        await this.$store.dispatch('users/sessions/photo', payload)
        this.$root.$bvToast.toast(this.$t('users.settings.photo.success'), {
          title: 'Cuisinier Rebelle',
          variant: 'info',
          solid: true
        })
        this.$router.push({
          path: `/u/${this.currentUser.slug}/settings`
        })
      } else {
        this.$root.$bvToast.toast(this.errors[0], {
          title: 'Cuisinier Rebelle',
          variant: 'danger',
          solid: true
        })
      }
    }
  }
}
</script>
