import api from '@/services/Api'

export default {
  premregister (credentials) {
    return api().post('premregister', credentials)
  },
  premlogin (credentials) {
    return api().post('premlogin', credentials)
  }
}
