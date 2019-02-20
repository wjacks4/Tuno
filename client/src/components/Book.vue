<template>
  <v-container fluid>
    <v-layout row justify-center>
      <v-flex xs10>
        <v-card>
          <v-toolbar flat dense class="light-green" dark>
            <v-toolbar-title>{{ bookname }}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <div class="white elevation-2">
            <div class="pl-4 pr-4 pb-2 pt-2">
              <v-data-table
                    :headers="headers"
                    :items="bettors"
                    class="elevation-1"
                  >
                    <template slot="items" slot-scope="props">
                      <td>{{ props.item.username }}</td>
                      <td>{{ props.item.credit  }}</td>
                    </template>
                    <template slot="no-data">
                      Looks like there aren't any bettors in this book yet...
                    </template>
              </v-data-table>
            </div>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import BookService from '@/services/BookService'
export default {
  data: () => ({
    show: false,
    bettors: [],
    dialog: false,
    headers: [
      {
        text: 'Username',
        align: 'left',
        sortable: false,
        value: 'name'
      },
      {
        text: 'Credit',
        sortable: false,
        value: 'credit'
      }
    ],
    editedIndex: -1,
    editedItem: {
      name: ''
    },
    defaultItem: {
      name: ''
    }
  }),
  async mounted () {
    // do a request to the backend for relevant books
    try {
      this.bettors = (await BookService.getBettor({
        bookowner: this.$store.state.premuser.email,
        bookname: this.$store.state.route.params.bookname
      })).data
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    async createBook () {
      try {
        await BookService.createBettor({
          username: this.username,
          password: this.password,
          credit: this.credit,
          bookowner: this.$store.state.premuser.email
        })
      } catch (error) {
        console.log(error)
      }
      if (this.editedIndex > -1) {
        Object.assign(this.books[this.editedIndex], this.editedItem)
      } else {
        this.books.push(this.editedItem)
      }
      this.close()
    },
    addRow (item) {
      this.editedIndex = this.books.indexOf(item)
      this.editedItem = Object.assign({}, item)
    },
    editItem (item) {
      this.editedIndex = this.books.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      const index = this.books.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.books.splice(index, 1)
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    }
  },
  computed: {
    premuser () {
      return this.$store.state.premuser.email
    },
    bookname () {
      return this.$store.state.route.params.bookname
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
