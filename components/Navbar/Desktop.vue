<template>
  <div
    ref="navbar"
    :class="['d-print-none navbar fixed-top d-flex px-3 py-2 justify-content-between align-items-center bg-white']"
  >
    <div class="d-flex align-items-center">
      <div
        class="navbar-brand d-flex align-items-center text-body mouse-pointer"
        @click="scroll2Top"
      >
        <img src="~/assets/img/favicon-32x32.png" width="32" height="32" class="mr-1">
        <span>{{ $t('navbar.brand') }}</span>
      </div>
    </div>
    <div class="form-group  d-flex flex-grow-1 mx-5">
      <input
        ref="searchInput"
        v-model="query"
        type="search"
        class="form-control"
        :placeholder="$t('navbar.search')"
        @keyup.enter="searchQuery"
      >
    </div>
    <div class="d-flex align-items-center">
      <div
        v-if="isAuthenticated"
        class="d-flex align-items-center"
      >
        <NuxtLink to="/top100" class="nav-item text-fire text-decoration-none">
          <i class="material-icons md-18 d-flex">whatshot</i>
        </NuxtLink>
        <NuxtLink v-if="bookmarks.length > 0" to="/bookmarks" class="nav-item text-body text-decoration-none">
          <i class="material-icons md-18 d-flex">{{ icons.bookmarks }}</i>
        </NuxtLink>
        <NuxtLink
          v-if="notifications.length > 0"
          to="/notifications"
          class="nav-item text-body text-decoration-none"
          @click.native="getNotifications"
        >
          <i class="material-icons md-18 d-flex">{{ icons.notifications }}</i>
        </NuxtLink>
        <b-dropdown
          ref="dropdown"
          variant="link"
          toggle-class="text-decoration-none text-body"
          no-caret
        >
          <template #button-content>
            <i class="material-icons md-18 d-flex">more_vert</i>
          </template>
          <div
            class="dropdown-item mouse-pointer"
            @click="onClick(`/u/${ currentUser.slug }`)"
          >
            {{ $t('navbar.recipes') }}
          </div>
          <div
            class="dropdown-item mouse-pointer"
            @click="onClick(`/u/${ currentUser.slug }/following`)"
          >
            {{ $t('navbar.following') }}
          </div>
          <div
            class="dropdown-item mouse-pointer"
            @click="onClick('/r/new')"
          >
            {{ $t('navbar.new_recipe') }}
          </div>
          <div
            class="dropdown-item mouse-pointer"
            @click="onClick(`/u/${ currentUser.slug }/settings`)"
          >
            {{ $t('navbar.settings') }}
          </div>
          <div
            class="dropdown-item mouse-pointer"
            @click="logout"
          >
            {{ $t('navbar.logout') }}
          </div>
          <div
            v-if="currentUser.admin"
            class="border-top pt-2 mt-2"
          >
            <div
              class="dropdown-item mouse-pointer"
              @click="onClick('/admin')"
            >
              {{ $t('navbar.admin') }}
            </div>
          </div>
        </b-dropdown>
      </div>
      <div
        v-else
        class="d-flex align-items-center"
      >
        <NuxtLink
          to="/login"
          class="btn btn-sm text-body text-decoration-none mx-2"
        >
          {{ $t('navbar.login') }}
        </NuxtLink>
        <NuxtLink
          to="/signup"
          class="btn btn-sm btn-info mx-2"
        >
          {{ $t('navbar.getStarted') }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'NavbarLarge',
  data () {
    return {
      loading: false,
      query: '',
      icons: {
        bookmarks: 'bookmark',
        notifications: 'notifications_none'
      }
    }
  },
  async fetch () {
    if (this.isAuthenticated) {
      await this.refreshAccessToken()
      this.fetchNotifications()
    }
  },
  computed: {
    ...mapGetters({
      bookmarks: 'users/sessions/bookmarks',
      currentUser: 'users/sessions/user',
      isAuthenticated: 'users/authentication/isAuthenticated',
      notifications: 'notifications/listSorted'
    }),
    isScrollTop () {
      return true
    }
  },
  watch: {
    notifications (oldValue, newValue) {
      if (oldValue.length !== newValue.length) {
        this.icons.notifications = 'notifications'
      }
    }
  },
  beforeMount () {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  mounted () {
    this.navbarHeight()
    // this.handleScroll()
    // window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    ...mapActions({
      fetchNotifications: 'notifications/list',
      fetchRecipes: 'recipes/list',
      refreshAccessToken: 'users/sessions/refreshAccessToken'
    }),
    onClick (path) {
      this.$refs.dropdown.hide(true)
      this.$router.push({ path })
    },
    getNotifications () {
      this.icons.notifications = 'notifications_none'
    },
    searchQuery () {
      if (this.query.length > 0) {
        this.$router.push({ path: '/search', query: { r: this.query } })
        this.query = ''
      }
    },
    scroll2Top () {
      if (this.$route.path === '/') {
        const scroll = () => {
          const scrollOptions = {
            top: 0,
            left: 0,
            behavior: 'smooth'
          }
          window.scrollTo(scrollOptions)
        }
        if (window.scrollY > 0) {
          scroll()
        }
      } else {
        this.$router.push({ path: '/' })
      }
    },
    handleScroll (event) {
      // Code to be executed when the window is scrolled
      if (window.scrollY > 0) {
        this.$refs.navbar.classList.add('border-bottom')
      } else {
        this.$refs.navbar.classList.remove('border-bottom')
      }
    },
    logout () {
      const message = this.$t('navbar.are_you_sure')

      const options = {
        okText: this.$t('navbar.logout'),
        cancelText: this.$t('navbar.cancel'),
        backdropClose: true, // set to true to close the dialog when clicking outside of the dialog window, i.e. click landing on the mask
        customClass: '' // Custom class to be injected into the parent node for the current dialog instance
      }

      this.$dialog
        .confirm(message, options)
        .then(async (dialog) => {
          // console.log('Clicked on proceed')
          await this.$store.dispatch('users/sessions/logOut', {})
          if (this.$route.path !== '/') {
            this.$router.push({ path: '/' })
          }
        })
        .catch(() => {
          // console.log('Clicked on cancel')
        })
    },
    navbarHeight () {
      this.$store.dispatch('navbarHeight', parseInt(this.$refs.navbar.offsetHeight))
    }
  }
}
</script>
