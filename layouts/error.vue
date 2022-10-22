<template>
  <v-app dark>
    <h1 v-if="error.statusCode === 404">
      <v-row justify="center">
        <v-col align="center">
          <v-img src="/err.png" contain width="150" height="300"></v-img>
          {{ pageNotFound }}
        </v-col>
      </v-row>
    </h1>
    <h1 v-else>
      <v-row justify="center">
        <v-col align="center">
          <v-img src="/err.png" contain width="150" height="300"></v-img>
          {{ otherError }}
        </v-col>
      </v-row>
    </h1>
    <NuxtLink to="/"> </NuxtLink>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: 'Page Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
