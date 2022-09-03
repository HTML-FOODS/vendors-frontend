<template>
  <div>
    <v-row justify="center" class="mt-10">
      <v-img
        src="https://firebasestorage.googleapis.com/v0/b/htmlfoods-63ed2.appspot.com/o/vendors%2Fchickenrep%2Fphoto_5807575664809851865_x.jpg?alt=media&token=7ffe1043-fae9-4764-8e4a-69758a594b94"
        height="400"
        width="560"
        contain
      />
    </v-row>

    <v-row justify="center" class="mt-0">
      <v-col cols="6" align="end">
        <v-btn color="#C42D32" large dark outlined class="rad" to="/vendor"> login to vendor dashboard </v-btn>
      </v-col>
      <v-col cols="6" align="start">
        <div>
          <v-btn color="#C42D32" large dark  outlined class="rad" to="/store">
            log in store dashboard
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>



<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@500&display=swap');


.rad.v-btn {
  border-radius: 8px;
 
}
</style>
