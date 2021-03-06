export default function ({ store, redirect, route }) {
  // If the user is not authorized
  if ((/.*\/r\/.*\/edit/).test(route.path)) {
    const position = store.getters['recipes/listSorted'].findIndex((item) => {
      return item.recipe.slug === route.params.slug
    })
    if (position > -1 && store.state.users.sessions.user.slug !== store.getters['recipes/listSorted'][position].user.slug) {
      return redirect('/')
    }
  }

  if ((/.*\/u\/.*/).test(route.path) && store.state.users.sessions.user.slug !== route.params.slug) {
    return redirect('/')
  }
}
