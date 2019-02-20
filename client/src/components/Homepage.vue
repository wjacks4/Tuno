<template>
  <v-container grid-list-md text-xs-center>
    <v-layout column>
      <v-flex md1>
        <div class="white elevation-2">
          <v-toolbar flat dense class="light-green" dark>
            <v-toolbar-title>BLABLA</v-toolbar-title>
            <v-icon>mdi-anchor</v-icon>
          </v-toolbar>

          <div class="pl-4 pr-4 pt-2 pb-2">
            <form
              name="Tuno-form"
              autocomplete="off">
              <v-text-field
                label="E-Mail"
                v-model="email"
              ></v-text-field>
              <br>
              <v-text-field
                label="Password"
                type="password"
                v-model="password"
                autocomplete="new-password"
              ></v-text-field>
            </form>
            <br>
            <div class="error" v-html="error" />
            <br>
            <v-btn
              dark
              class="light-green"
              @click="register">
              Register
            </v-btn>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-fot-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.input-group--text-field input {
  border-bottom: 1px solid black;
}

.toolbar_title {
  color: white;
}
</style>
