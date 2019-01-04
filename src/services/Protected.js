export default {
  isAuthenticated() {
    return (localStorage.getItem('auth-token') !== null) ? true : false;
  }
}