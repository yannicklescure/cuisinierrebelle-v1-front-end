<template>
  <div>
    <div v-if="$fetchState.error">
      <NotFound />
    </div>
    <div v-else>
      <UsersBanner :user="user" />
      <div ref="container" class="container">
        <div v-if="items.length > 0" class="px-md-3 px-md-5">
          <table class="table table-borderless">
            <tbody
              v-for="(item) in items"
              :key="item.id"
            >
              <UsersCard :item="item" />
            </tbody>
            <InfiniteScroll :enough="enough" @load-more="getData()">
              <template v-if="busy">
                <span>{{ $t('init.loading') }}</span>
              </template>
            </InfiniteScroll>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'UserFollowing',
  middleware: 'authentication',
  data () {
    return {
      busy: false,
      enough: false,
      items: [],
      show: false
    }
  },
  async fetch () {
    await this.getUser(this.$route.params.slug)
    this.show = true
  },
  computed: {
    ...mapGetters({
      usersFilter: 'users/filter'
    }),
    user () {
      return this.usersFilter(this.$route.params.slug)
    },
    users () {
      return this.user ? this.user.following.data : []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    ...mapActions({
      getUser: 'users/getUser'
    }),
    getData () {
      this.busy = true
      const qty = this.items.length + 20 > this.users.length ? this.users.length - this.items.length : 20
      if (qty !== 20) {
        this.enough = true
      }
      this.items = this.items.concat(this.users.slice(this.items.length, this.items.length + qty))
      this.busy = false
    }
  }
}
</script>
