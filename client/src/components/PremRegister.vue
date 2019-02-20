<template>
  <v-container fluid>
    <v-layout row justify-center>
      <v-flex md8>
        <panel title="Register as Premium User">
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
              @click="premregister">
              Register
            </v-btn>
          </div>
        </panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Panel from '@/components/Panel'
import PremAuthenticationService from '@/services/PremAuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async premregister () {
      try {
        const response = await PremAuthenticationService.premregister({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setPremToken', response.data.premtoken)
        this.$store.dispatch('setPremUser', response.data.premuser)

        this.$router.push('/PremHomepage')
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

<style scoped>
.error {
  color: red
}
</style>
