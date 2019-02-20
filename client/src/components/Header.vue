<template>
  <v-toolbar fixed class="light-green" dark>
    <v-toolbar-title class="ml-0 pl-3">
      <v-toolbar-side-icon
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
        v-if="!$store.state.isUserLoggedIn"
        @click="navigateTo({name: 'login'})">
        Tuno +
      </v-btn>
      <v-btn flat dark
        v-if="$store.state.isUserLoggedIn"
        @click="logout">
        Logout
      </v-btn>
      <v-btn flat dark> Sports </v-btn>
      <v-btn flat dark> About Us </v-btn>
    </v-toolbar-items>
  </v-toolbar>
  <v-navigation-drawer
    v-model="drawer"
    absolute
    temporary
  >
    <v-list class="pa-1">
      <v-list-tile avatar>
        <v-list-tile-avatar>
          <img src="https://randomuser.me/api/portraits/men/85.jpg">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>John Leider</v-list-tile-title>
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

<script>
export default {
  props: [
    drawer
  ],
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'root'
      })
    }
  }
}
</script>

<style scoped>
.home {
  cursor:pointer;
}

.home:hover {
  color: black;
}
</style>
