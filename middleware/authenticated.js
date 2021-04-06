export default function ({ store, redirect }) {
  // If the user is not authenticated
  const isAuthenticated = store.state.users.authentication.isAuthenticated
  if (!isAuthenticated) {
    return redirect({ name: 'login' })
  }
}
