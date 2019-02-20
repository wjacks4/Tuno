<template>
  <v-container fluid>
    <v-layout row justify-center>
      <v-flex md8>
        <panel title="Premium User Login">
          <div class="pl-4 pr-4 pb-2 pt-2">
            <v-text-field
              label="Username"
              v-model="email"
            ></v-text-field>
            <br>
            <v-text-field
              label="Password"
              type="password"
              v-model="password"
            ></v-text-field>
            <br>
            <div class='error' v-html='error'></div>
            <br>
            <v-btn dark
              class = "light-green"
              @click="premlogin({
                name: 'premhomepage',
                params: {
                  userid: email
                }
              })">
              Login
            </v-btn>
          </div>
        </panel>
        <p v-if="error"> Forgot your username / password? </p>
      </v-flex>
    </v-layout>
    <br>
    <v-layout row justify-center>
      <v-flex xs3>
        <v-btn
          dark
          class="light-green"
          @click="navigateTo({name: 'premregister'})">
          New Premium Users
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import PremAuthenticationService from '@/services/PremAuthenticationService'
import Panel from '@/components/Panel'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async premlogin (route) {
      try {
        const response = await PremAuthenticationService.premlogin({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setPremToken', response.data.premtoken)
        this.$store.dispatch('setPremUser', response.data.premuser)
        this.$router.push(route)
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    navigateTo (route) {
      this.$router.push(route)
    }
  },
  components: {
    Panel
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error {
  color: red;
}
</style>
