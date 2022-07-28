<template>
  <div>
    <v-card flat class="pt-4">
      <v-row class="mt-6 mx-auto titl-fnt-mb-b2" justify="center">
        <v-col cols="6">
          <v-text-field
            label="Store name"
            outlined
            class="text-capitalize titl-fnt-mb-b2"
            color="#13274a"
            v-model="name"
            :error-messages="nameErrors"
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          ></v-text-field>

          <v-text-field
            label="User name"
            outlined
            class="text-capitalize"
            color="#13274a"
            v-model="userName"
            :error-messages="userNameErrors"
            @input="$v.userName.$touch()"
            @blur="$v.userName.$touch()"
          ></v-text-field>

          <v-text-field
            label="Password"
            outlined
            class="text-capitalize"
            color="#13274a"
            v-model="password"
            :error-messages="passwordErros"
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
          ></v-text-field>

          <v-text-field
            label="Phone number"
            outlined
            class="text-capitalize"
            color="#13274a"
            v-model="phone"
            type="number"
            :error-messages="phoneErrors"
            @input="$v.phone.$touch()"
            @blur="$v.phone.$touch()"
          ></v-text-field>

          <v-text-field
            id="searchTextField"
            class="input-cnt"
            outlined
            v-model="text"
            dense
            placeholder="Enter store location"
            :error-messages="textErrors"
            @input="$v.text.$touch()"
            @blur="$v.text.$touch()"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-4 mb-4" justify="center">
        <v-btn
          color="#C42D32"
          large
          :loading="loading"
          dark
          @click="dialog = true"
          class="titl-fnt-mb-b2 text-capitalize"
        >
          create store
        </v-btn>
      </v-row>
    </v-card>

    <v-snackbar v-model="snackbar" :timeout="timeout" color="success" top>
      {{ msg }}
    </v-snackbar>
    <v-snackbar v-model="snackbarErr" :timeout="timeout" color="error" top>
      {{ msg }}
    </v-snackbar>

    <v-dialog
      transition="dialog-bottom-transition"
      max-width="600"
      v-model="dialog"
    >
      <v-card>
        <v-toolbar color="primary" dark>Preview</v-toolbar>
        <v-card-text>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="text-capitalize text-bold"
                >Store name</v-list-item-title
              >
              <v-list-item-subtitle>{{ name }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="text-capitalize text-bold"
                >Store userame</v-list-item-title
              >
              <v-list-item-subtitle>{{ userName }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="text-capitalize text-bold"
                >password</v-list-item-title
              >
              <v-list-item-subtitle>{{ password }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="text-capitalize text-bold"
                >Store phonenumber</v-list-item-title
              >
              <v-list-item-subtitle>{{ phone }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="text-capitalize text-bold"
                >Store Address</v-list-item-title
              >
              <v-list-item-subtitle>{{ text }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="dialog = false">Back</v-btn>
          <v-btn
            :loading="loading"
            color="green darken-1"
            text
            @click="createStore"
            >Create store</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import { validationMixin } from 'vuelidate'
import {
  required,
  minLength,
  maxLength,
  email,
  sameAs,
} from 'vuelidate/lib/validators'
export default {
  layout: 'vendorDashboard',
  mixins: [validationMixin],
  validations: {
    name: { required },
    password: { required },
    userName: { required },
    text: { required },
    phone: { required },
  },

  head() {
    return {
      script: [
        {
          src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDgbpaNeMx0hRPDT16gj1HweVhKTFnD1n4&libraries=places',
        },
      ],
    }
  },

  data() {
    return {
      msg: '',
      snackbar: false,
      snackbarErr: false,
      loading: false,
      timeout: 7000,
      date: '',
      text: '',
      lat: '',
      long: '',
      name: '',
      userName: '',
      password: '',
      phone: '',
      address: '',
      dialog: false,
    }
  },
  computed: {},
  methods: {
    previewCreateStore() {
      this.dialog = true
    },
    getAddressData: function (addressData, placeResultData, id) {
      this.address = addressData
    },
    async createStore() {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.loading = true
        try {
          const res = await this.$axios.$post(
            `${this.$config.baseUrl}vendor/createstore`,
            {
              email: this.email,
              password: this.password,
              storeName: this.name,
              storeUsername: this.userName,
              address: this.address,
              lat: this.lat,
              lng: this.long,
              phoneNumber: this.phone,
            }
          )
          console.log(res)
          this.loading = false
          this.msg = 'store created'

          this.snackbar = true
        } catch (error) {
          console.log(error.response)
          this.loading = false
          this.msg = error.response.data.msg
          this.snackbarErr = true
        }
      }
    },
  },
  created() {
    // this.getPartners()
    // this.getStream()
    // this.getCoach()
  },
  filters: {
    formatdate(value) {
      if (value == true) {
        return 'Active'
      } else {
        return 'disabled'
      }
    },
  },
  updated() {
    var input = document.getElementById('searchTextField')
    var options = {
      types: ['geocode'],
      componentRestrictions: { country: 'ng' },
    }
    const place = new google.maps.places.Autocomplete(input, options)
    google.maps.event.addListener(place, 'place_changed', () => {
      var loc = place.getPlace()
      //console.log(loc.formatted_address)
      this.lat = loc.geometry.location.lat()
      this.address = loc.formatted_address
      this.long = loc.geometry.location.lng()
    })
  },
  computed: {
    passwordErros() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('password is required.')
      return errors
    },
    nameErrors() {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.required && errors.push('store name is required')
      return errors
    },
    textErrors() {
      const errors = []
      if (!this.$v.text.$dirty) return errors
      !this.$v.text.required && errors.push('store location is required')
      return errors
    },
    userNameErrors() {
      const errors = []
      if (!this.$v.userName.$dirty) return errors
      !this.$v.userName.required && errors.push('store username is required')
      return errors
    },
    phoneErrors() {
      const errors = []
      if (!this.$v.phone.$dirty) return errors
      !this.$v.phone.required && errors.push('store phone number is required')
      return errors
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@500&display=swap');

a {
  text-decoration: none;
}

.titl-fnt-mb {
  font-family: 'Urbanist', sans-serif;
  font-size: 20px;
  font-weight: lighter;
  color: #5465ff;
}

.titl-fnt-mb-b {
  font-family: 'Urbanist', sans-serif;
  font-size: 20px;
  font-weight: bold;
  color: #5465ff;
}

.titl-fnt-mb-b2 {
  font-family: 'Urbanist', sans-serif;
  font-size: 12px;
}

.titl-fnt-mb-b3 {
  font-family: 'Urbanist', sans-serif;
  font-size: 15px;
}
.titl-fnt {
  font-family: 'Urbanist', sans-serif;
  font-size: 15px;
  color: #585960;
}

.titl-fnt-mb-b-x {
  font-family: 'Urbanist', sans-serif;
  font-size: 15px;
  font-weight: bold;
  color: #5465ff;
}
</style>
