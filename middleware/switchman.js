export default function ({ app, redirect }) {
  app.router.beforeEach((to, from, next) => {
    // `to` and `from` are both route objects
    // console.log(to.path)
    // console.log(from.path)
    if (from.path === '/login' && to.path === '/users/password/reset') {
      next({ path: '/' })
    } else {
      next()
    }
  })
}
