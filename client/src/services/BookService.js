import api from '@/services/Api'

export default {
  createBook (books) {
    return api().post('books/createBook', books)
  },
  createBettor (bettors) {
    return api().post('books/createBettor', bettors)
  },
  createBettorTest (bettors) {
    return api().post('books/createBettorTest', bettors)
  },
  getBook (book) {
    return api().post('books/getBook', book)
  },
  getBettor (bettor) {
    return api().post('books/getBettors', bettor)
  }
}
