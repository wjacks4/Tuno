<template>
  <v-container grid-list-md text-xs-center>
    <v-layout column>
      <v-flex md1>
        <panel title="Register">
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
        </panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Panel from '@/components/Panel'
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)

        this.$router.push('/OddsHome')
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

<style scoped>
.error {
  color: red
}
</style>
