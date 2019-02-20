<template>
  <v-container fluid>
    <v-layout row justify-center>
      <v-flex md8>
        <panel title="BLABLABLA">
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
              @click='login'>
              Login
            </v-btn>
          </div>
        </panel>
        <p v-if="error"> Forgot your username / password? </p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
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
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push('/stdhomepage')
      } catch (error) {
        this.error = error.response.data.error
      }
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
  background-color: red;
}
</style>
