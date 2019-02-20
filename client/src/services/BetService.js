import api from '@/services/Api'

export default {
  getBalance (user) {
    return api().get('balance', user)
  },
  placeBet (credentials) {
    return api().post('bet', credentials)
  }
}
