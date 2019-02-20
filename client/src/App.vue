<template>
  <div id="app">
    <v-app>
      <template>
          <v-toolbar
            :clipped-left="$vuetify.breakpoint.lgAndUp"
            class="light-green"
            dark
            app
            fixed
          >
            <v-toolbar-title class="ml-0 pl-3">
              <v-toolbar-side-icon
                v-if="$store.state.isUserLoggedIn || $store.state.isPremUserLoggedIn"
                @click.stop="drawer = !drawer">
              </v-toolbar-side-icon>
              <span
                class="home"
                @click="navigateTo({name: 'root'})">
                Tuno
              </span>
            </v-toolbar-title>
            <v-spacer>
            </v-spacer>
            <v-toolbar-items>
              <v-btn flat dark
                v-if="!$store.state.isUserLoggedIn && !$store.state.isPremUserLoggedIn"
                @click="navigateTo({name: 'premlogin'})">
                Tuno +
              </v-btn>
              <v-btn flat dark
                v-if="$store.state.isUserLoggedIn || $store.state.isPremUserLoggedIn"
                @click="logout">
                Logout
              </v-btn>
              <v-btn flat dark> Sports </v-btn>
              <v-btn flat dark> About Us </v-btn>
            </v-toolbar-items>
          </v-toolbar>

          <v-navigation-drawer
            v-if="$store.state.isUserLoggedIn"
            v-model="drawer"
            absolute
            temporary
          >
            <v-list class="pa-1">
              <v-list-tile avatar>
                <v-list-tile-avatar>
                  <img src="https://www.freeiconspng.com/uploads/profile-icon-person-user-19.png">
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title>{{user}}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>

            <v-list class="pt-0" dense>
              <v-divider></v-divider>

              <v-list-tile
                v-for="item in items"
                :key="item.title"
              >
                <v-list-tile-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-navigation-drawer>

          <v-navigation-drawer
            v-if="$store.state.isPremUserLoggedIn"
            v-model="drawer"
            absolute
            temporary
          >
            <v-list class="pa-1">
              <v-list-tile avatar>
                <v-list-tile-avatar>
                  <img src="https://www.freeiconspng.com/uploads/profile-icon-person-user-19.png">
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title>{{premuser}}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>

            <v-list class="pt-0" dense>
              <v-divider></v-divider>

              <v-list-tile
                v-for="item in items"
                :key="item.title"
              >
                <v-list-tile-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-navigation-drawer>

      </template>
      <template>
        <v-navigation-drawer
          :clipped="$vuetify.breakpoint.lgAndUp"
          v-model="drawer"
          fixed
          app
        >
        </v-navigation-drawer>
          <v-toolbar v-if="$store.state.isUserLoggedIn">
            <v-list class="pa-1">
              <v-list-tile avatar>
                <v-list-tile-avatar>
                  <img src="https://www.freeiconspng.com/uploads/profile-icon-person-user-19.png">
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title>{{user}}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-toolbar>

          <v-toolbar v-if="$store.state.isPremUserLoggedIn">
            <v-list class="pa-1">
              <v-list-tile avatar>
                <v-list-tile-avatar>
                  <img src="https://www.freeiconspng.com/uploads/profile-icon-person-user-19.png">
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title>{{premuser}}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-toolbar>
      </template>
      <main>
        <v-container fluid>
          <router-view>

          </router-view>
        </v-container>
      </main>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      drawer: false,
      items: [
        {title: 'Home', icon: 'home'},
        {title: 'My Bets', icon: 'local_atm'},
        {title: 'Popular Bets', icon: 'bar_chart'},
        {title: 'Sports', icon: 'apps'},
        {title: 'Tuno +', icon: 'add_box'},
        {title: 'Strategies & Insights', icon: 'trending_up'},
        {title: 'Rules', icon: 'outlined_flag'},
        {title: 'About', icon: 'live_help'}
      ]
    }
  },
  computed: {
    user () {
      return this.$store.state.user.email
    },
    premuser () {
      return this.$store.state.premuser.email
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$store.dispatch('setPremToken', null)
      this.$store.dispatch('setPremUser', null)
      this.$router.push({
        name: 'login'
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
