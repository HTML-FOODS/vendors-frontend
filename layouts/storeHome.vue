<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app flat color="#ffffff">
      <v-toolbar-title>
        <nuxt-link to="/">
          <v-img class="ml-2" src="/logo.png" contain width="90"></v-img>
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="text-capitalize mr-4" outlined rounded color="#C42D32">
        register
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'vendoir',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
}
</script>
