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
          ></v-text-field>

          <v-text-field
            label="User name"
            outlined
            class="text-capitalize"
            color="#13274a"
            v-model="workid"
          ></v-text-field>

          <v-text-field
            label="Password"
            outlined
            class="text-capitalize"
            color="#13274a"
            v-model="email"
          ></v-text-field>

          <v-text-field
            label="Phone number"
            outlined
            class="text-capitalize"
            color="#13274a"
            v-model="phone"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-4 mb-4" justify="center">
        <v-btn
          color="#C42D32"
          large
          :loading="loading"
          dark
          @click="add_partner"
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
  </div>
</template>

<script>
export default {
  layout: 'storeDashboard',

  data() {
    return {
      date: '',
      headers: [
        {
          text: 'Partner name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Stream', value: 'tribe' },
        { text: 'Designation', value: 'designation' },
        { text: 'Status', value: 'status' },
        { text: 'view profile' },
      ],
      body: [],
      loading: false,
      msg: '',
      timeout: 7000,
      snackbar: false,
      snackbarErr: false,
      name: '',
      workid: '',
      email: '',
      resumption: '',
      phone: '',
      stream: '',
      designation: '',
      currentSkill: '',
      nextskill: '',
      rolecoach: '',
      rolecoach2: '',
      tab: null,
      ref: '',
      new_data: '',
      e1: 1,
      email: '',
      address: '',
      phoneNumber: '',
      name: '',
      picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu2: false,
      selectStream: [],
      listofCoach: [],
      skillset: [
        'Associate Specialist',
        'Specialist',
        'Snr. Specialist',
        'Asst. Manager',
        'Manager',
        'Snr. Manager',
        'Vice President',
        'Snr. Vice President',
        'Group Vice President',
        'Executive Vice President',
      ],
      item: [
        {
          text: 'View all partner',
          disabled: false,
          to: '/admin/dashboard/partner',
          exact: true,
        },
        {
          text: 'Add a partner',
          disabled: false,
          to: '/admin/dashboard/partner/add-partner',
        },
      ],
    }
  },
  computed: {},
  methods: {
    async getStream() {
      try {
        const res = await this.$axios.$get(
          `${this.$config.baseUrl}admin/godmode/workstream/getstreams`
        )
        console.log(res.data)
        this.selectStream = res.data
      } catch (error) {
        console.log(error.response)
      }
    },
    async getCoach() {
      try {
        const res = await this.$axios.$get(
          `${this.$config.baseUrl}admin/godmode/coach/all`
        )
        console.log(res.data)
        this.listofCoach = res.data
      } catch (error) {
        console.log(error.response)
      }
    },
    async getPartners() {
      try {
        const res = await this.$axios.$get(
          `${this.$config.baseUrl}admin/godmode/emp/viewall`
        )
        console.log(res.data)
        this.body = res.data
      } catch (error) {
        console.log(error.response)
      }
    },
    async add_partner() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.loading = true
        try {
          const res = await this.$axios.$post(
            `${this.$config.baseUrl}admin/godmode/emp/create`,
            {
              name: this.name,
              workid: this.workid,
              workemail: this.email,
              designation: this.designation,
              tribe: this.stream,
              phonenumber: this.phone,
              dateOfresumption: this.date,
              currentSkill: this.currentSkill,
              nextSkill: this.nextskill,
              roleCoach1: this.rolecoach,
              roleCoach2: this.rolecoach2,
            }
          )
          console.log(res)
          this.loading = false
          this.msg = res.msg
          this.snackbar = true
        } catch (error) {
          console.log(error.response)
          this.loading = false
          this.msg = error.response.data.detail
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
      if (!this.$v.rolecoach.$dirty) return errors
      !this.$v.rolecoach.required && errors.push('required')
      return errors
    },
    roleCoach2Errors() {
      const errors = []
      if (!this.$v.rolecoach2.$dirty) return errors
      !this.$v.rolecoach2.required && errors.push('required')
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
