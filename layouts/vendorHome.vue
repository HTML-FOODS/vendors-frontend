<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app flat color="#ffffff">
      <v-toolbar-title>
        <nuxt-link to="/">
          <v-img class="ml-2" src="https://firebasestorage.googleapis.com/v0/b/htmlfoods-63ed2.appspot.com/o/vendors%2Fchickenrep%2FChickenRepublic_Logo.svg?alt=media&token=59aea29c-5eb2-4083-bc7e-255df56fe408" width="50" height="50"></v-img>
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


<style>
html{
  font-family: 'Lato', sans-serif;
}
</style>
