export default function ({ store, redirect, route }) {
  // If the user is not authenticated
  const isAuthenticated = store.state.users.authentication.isAuthenticated

  if (!isAuthenticated && route.fullPath === '/signup') {
    return
  }

  if (!isAuthenticated && route.fullPath !== '/login') {
    return redirect({ path: '/login' })
  }

  if (isAuthenticated && (route.fullPath === '/login' || route.fullPath === '/signup')) {
    return redirect({ path: '/' })
  }
}
