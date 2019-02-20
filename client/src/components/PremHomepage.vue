<template>
  <v-layout>
    <v-flex xs6 ml-2>
      <v-card>
        <v-toolbar flat dense class="light-green" dark>
          <v-toolbar-title>Bettor crud test panel</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <v-btn slot="activator" color="primary" dark class="mb-2">New Item</v-btn>
            <v-card>
              <v-card-title>
                <span class="headline"></span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedBettor.username" label="Username"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedBettor.password" label="Password"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedBettor.credit" label="Credit"></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
        <div class="white elevation-2">
          <div class="pl-4 pr-4 pb-2 pt-2">
            <v-data-table
                  :headers="headers"
                  :items="bettors"
                  hide-actions
                  class="elevation-1"
                >
                  <template slot="items" slot-scope="props">
                    <tr>
                      <td>
                        <span v-show="props.item.editToggle==false"> {{ props.item.username }} </span>
                        <v-text-field v-show="props.item.editToggle==true" v-model="editedBettor.username"></v-text-field>
                      </td>
                      <td>
                        <span v-show="props.item.editToggle==false"> {{ props.item.password }} </span>
                        <v-text-field v-show="props.item.editToggle==true" v-model="editedBettor.password"></v-text-field>
                      </td>
                      <td>
                        <span v-show="props.item.editToggle==false"> {{ props.item.credit }} </span>
                        <v-text-field v-show="props.item.editToggle==true" v-model="editedBettor.credit"></v-text-field>
                      </td>
                      <td class="justify-center layout px-0">
                        <v-icon
                          small
                          class="mr-2"
                          @click="editBettor(props.item)"
                        >
                          edit
                        </v-icon>
                        <v-icon
                          small
                          @click="deleteBettor(props.item)"
                        >
                          delete
                        </v-icon>
                      </td>
                    </tr>
                  </template>
                  <template slot="no-data">
                    <v-btn color="primary">Reset</v-btn>
                  </template>
                </v-data-table>
          </div>
        </div>
      </v-card>
    </v-flex>

    <v-flex xs6 ml-2>
      <v-card>
        <v-toolbar flat dense class="light-green" dark>
          <v-toolbar-title>{{ premuser }}'s Books</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog persistent v-model="dialog" max-width="750px">
            <v-btn slot="activator" class="light-green acccent-4" @click="startBook" small dark>
              CREATE NEW BOOK
            </v-btn>
            <v-card>
              <div class="pl-0 pr-0 pb-0 pt-0 elevation-1">
                <v-toolbar flat color="light-green">
                  <v-toolbar-title>
                    <v-text-field placeholder="Book Name" v-model="editedBook.name" class="pb-0 pt-3"></v-text-field>
                  </v-toolbar-title>
                  <v-divider
                    class="mx-4"
                    inset
                    vertical
                  ></v-divider>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <template>
                  <v-data-table
                  :headers="headers"
                  :items="bettors"
                  hide-actions
                  class="elevation-1"
                  >
                    <template slot="items" slot-scope="props">
                      <td>
                        <span v-show="props.item.editToggle==false"> {{ props.item.username }} </span>
                        <v-text-field
                          v-show="props.item.editToggle==true"
                          v-model="editedBettor.username"
                          placeholder = "Username"
                          @blur = "hotUpdate"
                        ></v-text-field>
                      </td>
                      <td>
                        <span v-show="props.item.editToggle==false"> {{ props.item.password }} </span>
                        <v-text-field
                          v-show="props.item.editToggle==true"
                          v-model="editedBettor.password"
                          placeholder = "Password"
                          @blur = "hotUpdate"
                        ></v-text-field>
                      </td>
                      <td>
                        <span v-show="props.item.editToggle==false"> {{ props.item.credit}} </span>
                        <v-text-field
                          v-show="props.item.editToggle==true"
                          v-model="editedBettor.credit"
                          placeholder = "Credit"
                          @blur = "hotUpdate"
                        ></v-text-field>
                      </td>
                      <td class="layout px-0">
                        <v-layout row>
                          <v-btn
                            v-show="props.item.editToggle==false"
                            small
                            fab
                            outline
                            class="mr-2"
                            color="indigo"
                            @click="editBettor(props.item)"
                          >
                            <v-icon>
                              edit
                            </v-icon>
                          </v-btn>
                          <v-btn
                            v-show="props.item.editToggle==false"
                            small
                            fab
                            outline
                            class="mr-2"
                            color="red"
                            @click="deleteBettor(props.item)"
                          >
                            <v-icon>
                              delete
                            </v-icon>
                          </v-btn>
                          <v-btn
                            v-show="props.item.editToggle==true"
                            small
                            fab
                            outline
                            class="mr-2"
                            color="green"
                            @click="save"
                          >
                            <v-icon>
                              check
                            </v-icon>
                          </v-btn>
                        </v-layout>
                      </td>
                    </template>
                    <template slot="no-data">
                      <span> There are no users in this book</span>
                    </template>
                  </v-data-table>
                </template>
                <tr v-show="newBettorToggle==true">
                  <td>
                    <v-text-field v-model="editedBettor.username" placeholder="Username"></v-text-field>
                  </td>
                  <td>
                    <v-text-field v-model="editedBettor.password" placeholder="Password"></v-text-field>
                  </td>
                  <td>
                    <v-text-field v-model="editedBettor.credit" placeholder="Credit"></v-text-field>
                  </td>
                  <td class="justify-center layout px-0">
                    <v-btn
                      small
                      outline
                      fab
                      color="green"
                      class="mr-2"
                      @click.native="save">
                      <v-icon>
                        check
                      </v-icon>
                    </v-btn>
                  </td>
                </tr>
                <v-divider
                  class="mx-2"
                  horizontal
                ></v-divider>
                <v-card-actions>
                <v-btn
                  fab
                  small
                  absolute
                  right
                  color="light-green"
                  @click="addRow">
                    <v-icon>
                      add
                    </v-icon>
                </v-btn>
                  <v-btn
                    color="light-green darken-1"
                    flat @click.native="close">
                      Cancel
                  </v-btn>
                  <v-btn
                    color="light-green darken-1"
                    flat @click.native="submitInfo">
                      Save
                  </v-btn>
                  <br>
                  <div class="error" v-html="error" />
                  <br>
                </v-card-actions>
              </div>
            </v-card>
          </v-dialog>
        </v-toolbar>
        <div class="white elevation-2">
          <div class="pl-4 pr-4 pb-2 pt-2">
            <v-list two-line>
              <template v-for="book in books">
                <!-- <v-divider></v-divider> -->
                <v-list-tile
                  :key="book.name"
                  @click="navigateTo({
                    name: 'book',
                    params: {
                      userid: premuser,
                      bookname: book.name
                    }
                  })"
                  ripple
                >
                  <v-list-tile-content>
                    <v-list-tile-title v-text="book.name"></v-list-tile-title>
                  </v-list-tile-content>
                  <v-icon :color="book.active ? 'teal' : 'green'">edit</v-icon>
                </v-list-tile>
              </template>
            </v-list>
          </div>
        </div>
      </v-card>
    </v-flex>
  </v-layout>

</template>

<script>
import BookService from '@/services/BookService'
export default {
  data: () => ({
    show: false,
    newBettorToggle: false,
    books: [
      {
        name: 'werwewer',
        owner: 'premtest@premtest'
      }
    ],
    bettors: [
      {
        username: '',
        password: '',
        credit: null,
        editToggle: true
      }
    ],
    dialog: false,
    headers: [
      {
        text: 'Username',
        align: 'left',
        sortable: false,
        value: 'name'
      },
      {
        text: 'Password',
        sortable: false,
        value: 'password'
      },
      {
        text: 'Credit',
        sortable: false,
        value: 'credit'
      },
      {
        text: '',
        sortable: false,
        value: ''
      }
    ],
    editedBettorIndex: 0,
    rowcount: 1,
    editedBettor: {
      username: '',
      password: '',
      credit: null,
      editToggle: true
    },
    editedBook: {
      name: ''
    },
    defaultBettor: {
      username: '',
      password: '',
      credit: null,
      editToggle: false
    }
  }),
  async mounted () {
  // do a request to the backend for relevant books
    try {
      this.books = (await BookService.getBook({
        owner: this.$store.state.premuser.email
      })).data
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    async submitInfo () {
      try {
        console.log(JSON.stringify(this.bettors))
        console.log(JSON.stringify(this.books))
        await BookService.createBook({
          books: this.books
        })
        await BookService.createBettorTest({
          bettors: this.bettors
        })
      } catch (error) {
        console.log(error)
      }
      if (this.editedIndex > -1) {
        Object.assign(this.books[this.editedBettorIndex], this.editedItem)
      } else {
        // this.books.push(this.editedItem)
      }
      this.close()
    },
    hotUpdate () {
      Object.assign(this.bettors[this.editedBettorIndex], this.editedBettor)
    },
    showToggle () {
      console.log(this.testShow)
      this.testShow = !this.testShow
      console.log(this.testShow)
    }
  },
  computed: {
    premuser () {
      return this.$store.state.premuser.email
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
