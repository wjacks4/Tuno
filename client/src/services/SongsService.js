import api from '@/services/Api'

export default {
  getSongs () {
    return api().get('songs')
  }
}
