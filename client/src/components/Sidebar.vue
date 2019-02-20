<template>
  <v-navigation-drawer
    :clipped="$vuetify.breakpoint.lgAndUp"
    v-model="drawer"
    fixed
    app
  >
  </v-navigation-drawer>
</template>

<script>
export default {
  props: [
    drawer
  ]
}
</script>
