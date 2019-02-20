import api from '@/services/Api'

export default {
  getOdds () {
    return api().get('odds')
  }
}
