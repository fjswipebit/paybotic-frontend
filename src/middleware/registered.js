export default function ({ store, redirect }) {
  // If the user is not registered
  if (!store.state.register.data) {
    return redirect('/register');
  }
}