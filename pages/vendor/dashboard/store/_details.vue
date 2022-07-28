<template>
  <div>
    <div>
        <v-row>
            <div class="text-capitalize text-bold ml-4 mt-4">
                {{storeName}}'s Dashboard
            </div>
        </v-row>
      <v-row>
        <v-col cols="3">
          <v-card color="#C42D32" dark class="mx-auto" max-width="344">
            <v-card-title class="text-h6"> Current Users</v-card-title>

            <v-card-actions>
              <v-btn text> 10,500</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card color="#C42D32" dark class="mx-auto" width="400">
            <v-card-title class="text-h6">Available meals</v-card-title>

            <v-card-actions>
              <v-btn text> 500</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card color="#C42D32" dark class="mx-auto" width="400">
            <v-card-title class="text-h6">Today's order</v-card-title>

            <v-card-actions>
              <v-btn text> 5008</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card color="#C42D32" dark class="mx-auto" width="400">
            <v-card-title class="text-h6">Pending order</v-card-title>

            <v-card-actions>
              <v-btn text> 508</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
export default {
  layout: 'vendorDashboard',
  mixins: [validationMixin],
  validations: {
    email: { required },

    date: { required },
    phone: { required },
    name: { required },

    stream: { required },
    designation: { required },
    currentSkill: { required },
    nextskill: { required },
    roleCoach1: { required },
    roleCoach2: { required },
  },
  data() {
    return {
      date: '',
      snackbar: false,
      snackbarErr: false,
      timeout: 7000,
      msg: '',
      storeName:"",
      id: this.$route.params.details,
    }
  },
  computed: {},
  methods: {
    async getStore() {
      try {
        const res = await axios.get(
          `${this.$config.baseUrl}vendor/getstore/${this.id}`
        )
        console.log(res.data[0])
         this.storeName = res.data[0].storeName
      } catch (error) {
        console.log(error.response)
      }
    },
  },
  created() {
    this.getStore()
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
  computed: {
    nameErrors() {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.required && errors.push('required.')
      return errors
    },
    workidErrors() {
      const errors = []
      if (!this.$v.workid.$dirty) return errors
      !this.$v.workid.required && errors.push('required')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.required && errors.push('required')
      return errors
    },
    phoneErrors() {
      const errors = []
      if (!this.$v.phone.$dirty) return errors
      !this.$v.phone.required && errors.push('required')
      return errors
    },
    dateErrors() {
      const errors = []
      if (!this.$v.date.$dirty) return errors
      !this.$v.date.required && errors.push('required')
      return errors
    },
    streamErrors() {
      const errors = []
      if (!this.$v.stream.$dirty) return errors
      !this.$v.stream.required && errors.push('required')
      return errors
    },
    designationErrors() {
      const errors = []
      if (!this.$v.designation.$dirty) return errors
      !this.$v.designation.required && errors.push('required')
      return errors
    },
    currentskillErrors() {
      const errors = []
      if (!this.$v.currentSkill.$dirty) return errors
      !this.$v.currentSkill.required && errors.push('required')
      return errors
    },
    nextskillErrors() {
      const errors = []
      if (!this.$v.nextskill.$dirty) return errors
      !this.$v.nextskill.required && errors.push('required')
      return errors
    },
    roleCoachErrors() {
      const errors = []
      if (!this.$v.roleCoach1.$dirty) return errors
      !this.$v.roleCoach1.required && errors.push('required')
      return errors
    },
    roleCoach2Errors() {
      const errors = []
      if (!this.$v.roleCoach2.$dirty) return errors
      !this.$v.roleCoach2.required && errors.push('required')
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
  font-size: 20px;
  color: #585960;
  font-weight: bold;
}

.titl-fnt-mb-b-x {
  font-family: 'Urbanist', sans-serif;
  font-size: 15px;
  font-weight: bold;
  color: #5465ff;
}
</style>
