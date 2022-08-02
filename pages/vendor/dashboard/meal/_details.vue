<template>
  <div>
    <v-row class="ma-4">
      <v-col cols="4"> </v-col>

      <v-col cols="8">
        <v-row justify="end">
          <v-chip class="ma-2" color="#C42D32" outlined @click="dialog3 = true">
            <v-icon left> mdi-pencil-outline </v-icon>
            Edit meal
          </v-chip>
        </v-row>
      </v-col>
    </v-row>

    <v-row class="mx-4">
      <v-card class="mx-auto" width="100%" height="auto" outlined elevation="1">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="text-capitalize text-h6">
              Meal Name
            </v-list-item-title>
            <v-list-item-subtitle>{{ combo }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-avatar tile size="100" color="grey">
            <v-img :src="mealImage"></v-img
          ></v-list-item-avatar>
        </v-list-item>

        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="text-capitalize text-h6">
              Meal cost
            </v-list-item-title>
            <v-list-item-subtitle>₦{{ amount }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-content>
            <v-list-item-title class="text-capitalize text-h6">
              Meal discount
            </v-list-item-title>
            <v-list-item-subtitle>₦{{ discount }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item two-line class="mt-6">
          <v-list-item-content>
            <v-list-item-title class="text-capitalize text-h6">
              Meal category
            </v-list-item-title>
            <v-list-item-subtitle>{{ mealCategory }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-content>
            <v-list-item-title class="text-capitalize text-h6">
              Meal available days
            </v-list-item-title>
            <v-list-item-subtitle>
              <v-chip
                class="ma-2"
                label
                small
                color="#C42D32"
                outlined
                v-for="(item, index) in availableDays"
                :key="index"
              >
                {{ item }}
              </v-chip></v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>

        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="text-capitalize text-h6">
              Meal Avalability
            </v-list-item-title>
            <v-list-item-subtitle>
              <v-chip class="ma-2" label small color="success" outlined>
                {{ isMealavailable || 'null' }}
              </v-chip></v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-row>

    <v-row class="mt-6 mx-4">
      <v-col><div class="text-h5">Stores</div> </v-col>
      <v-col cols="8">
        <v-row justify="end">
          <v-chip class="ma-2" color="#C42D32" outlined @click="dialog2 = true">
            <v-icon left> mdi-plus </v-icon>
            Add a store to this meal
          </v-chip>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="mt-4 mx-4">
      <v-card width="100vw" class="mx-auto mb-8" outlined elevation="1">
        <v-simple-table class="mt-2">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Store Name</th>
                <th class="text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in tableBody" :key="item.storeId" class="mt-2">
                <td class="text-capitalize">{{ item.storeName }}</td>

                <td>
                  <v-btn
                    text
                    class="text-capitalize"
                    x-small
                    color="red"
                    @click="setDeteleteid(item.storeId, item.storeName)"
                  >
                    Remove store from this meal
                    <v-icon right> mdi-delete </v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-row>

    <v-snackbar v-model="snackbar" :timeout="timeout" color="success" top>
      {{ msg }}
    </v-snackbar>
    <v-snackbar v-model="snackbarErr" :timeout="timeout" color="error" top>
      {{ msg }}
    </v-snackbar>

    <v-dialog v-model="dialogDelete" persistent width="400">
      <v-card>
        <v-card-title class="text-h6 text-capitalize pt-4">
          Remove "{{ removeStorename }}" from this meal?
        </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="dialogDelete = false"> Cancel </v-btn>
          <v-btn color="green darken-1" text @click="removeStore()">
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      transition="dialog-bottom-transition"
      max-width="600"
      v-model="dialog2"
    >
      <v-card>
        <v-toolbar color="#C42D32" dark>Add store to meal</v-toolbar>
        <v-row justify="center" class="mx-8 mt-6">
          <v-col>
            <v-select
              label="Select stores"
              outlined
              class="text-capitalize"
              color="#13274a"
              v-model="getSelectedStores"
              item-text="storeName"
              item-value="storeId"
              :items="storeList"
              :return-object="true"
              multiple
            ></v-select>
          </v-col>
        </v-row>
        <v-card-actions class="justify-end">
          <v-btn class="text-capitalize" text @click="dialog2 = false"
            >Back</v-btn
          >
          <v-btn
            :loading="loading"
            color="green darken-1"
            text
            @click="getAddStore"
            class="text-capitalize"
            >Add stores</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      transition="dialog-bottom-transition"
      max-width="600"
      v-model="dialog3"
    >
      <v-card>
        <v-toolbar color="#C42D32" dark>Edit meal details </v-toolbar>
        <v-row justify="center" class="mx-8 mt-6">
          <v-row justify="center" class="mx-8">
            <v-col>
              <v-text-field
                outlined
                label="Meal name"
                v-model="combo"
              ></v-text-field>
              <v-text-field
                outlined
                label="Amount"
                prepend-inner-icon="mdi-currency-ngn"
                v-model="amount"
              ></v-text-field>
              <v-text-field
                outlined
                label="Discount amount"
                prepend-inner-icon="mdi-currency-ngn"
                v-model="discount"
              ></v-text-field>
              <v-select
                label="Select meal category"
                outlined
                class="text-capitalize"
                color="#13274a"
                v-model="getMealCategory"
                :items="mealC"
              ></v-select>
              <v-select
                label="Select meal availabity"
                outlined
                class="text-capitalize"
                color="#13274a"
                v-model="mealAvailability"
                :items="availabilty"
              ></v-select>
              <v-combobox
                v-model="days"
                :items="items"
                label="Available Days"
                multiple
                outlined
              ></v-combobox>
            </v-col>
          </v-row>
        </v-row>
        <v-card-actions class="justify-end">
          <v-btn class="text-capitalize" text @click="dialog3 = false"
            >Back</v-btn
          >
          <v-btn
            :loading="loading"
            color="green darken-1"
            text
            @click="editMealdetails"
            class="text-capitalize"
            >update meal details</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  layout: 'vendorDashboard',

  data() {
    return {
      dialog3: false,
      dialog2: false,
      msg: '',
      snackbar: false,
      snackbarErr: false,
      timeout: 7000,
      dialogDelete: false,
      id: this.$route.params.details,
      getMealCategory: '',
      dialog2: false,
      makeAmeal: false,
      makeCombo: false,
      mealsMenu: true,
      addMealitem: false,
      addMealcategory: false,
      body: [],
      loading: false,
      msg: '',
      timeout: 7000,
      snackbar: false,
      snackbarErr: false,
      mealMenuTitle: 'Meals',
      combo: '',
      days: '',
      selRice: '',
      selSides: '',
      selDrinks: '',
      selProtein: '',
      dialog: false,
      availableDays: [],

      amount: null,
      discount: null,
      imageurl: '',
      getVendormeals: [],
      mealImage: '',
      getImageLink: '',
      storeList: [],
      test: '',
      getSelectedStores: [],
      mealCategory: '',
      tableBody: [],
      removeStorename: '',
      removeStoreid: '',
      items: [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
      ],
      mealC: [
        'EVERY DAY AFFORDABLE VALUE MEALS',
        'SOULFULLY SPICED FRIED CHICKEN',
        'FLAME GRILLED CHICKEN',
        'DELICIOUS ROTISSERIE CHICKEN',
        'BURGERS, WRAPS & CHICKWHIZZ',
        'TASTY SIDES',
        'SWEET TREATS & BEVERAGES',
      ],
      availabilty: ['available', 'not available'],
      mealAvailability: '',
      isMealavailable: '',
    }
  },
  computed: {},
  methods: {
    async editMealdetails() {
      try {
        const res = await this.$axios.post(
          `${this.$config.baseUrl}vendor/meals/edit/editmeal/${this.id}`,
          {
            day: this.days,
            mealName: this.combo,
            availableState: this.mealAvailability,
            mealCost: this.amount,
            discountCost: this.discount,
            mealCategory: this.getMealCategory,
          }
        )
        console.log(res)
        this.msg = 'Meal details updated...'
        this.dialog3 = false
        location.reload()
        this.snackbar = true
      } catch (error) {
        console.log(error)
      }
    },
    async getAddStore() {
      try {
        const res = await this.$axios.$post(
          `${this.$config.baseUrl}vendor/meals/edit/addstores`,
          {
            stores: this.getSelectedStores,
            _id: this.id,
          }
        )
        console.log(res)
        // location.reload()
        //  this.storeList = res
        // this.name = res.data.name
      } catch (error) {
        console.log(error.response)
      }
    },
    async getStores() {
      try {
        const res = await this.$axios.$get(
          `${this.$config.baseUrl}vendor/getstores`
        )
        console.log(res)
        this.storeList = res
        // this.name = res.data.name
      } catch (error) {
        console.log(error.response)
      }
    },
    async removeStore() {
      try {
        const res = await this.$axios.post(
          `${this.$config.baseUrl}vendor/meals/edit/removestore`,
          {
            _id: this.id,
            stores: {
              storeId: this.removeStoreid,
              storeName: this.removeStorename,
            },
          }
        )
        console.log(res)
        this.msg = 'Store removed'
        this.dialogDelete = false
        location.reload()
        this.snackbar = true
      } catch (error) {
        console.log(error)
      }
    },
    setDeteleteid(id, name) {
      this.removeStoreid = id
      this.removeStorename = name
      this.dialogDelete = true
    },
    async MealDeatil() {
      console.log(this.id)
      try {
        const res = await this.$axios.get(
          `${this.$config.baseUrl}vendor/meals/getmeal/${this.id}`
        )
        console.log(res.data)
        this.mealImage = res.data.mealImage
        this.combo = res.data.mealName
        this.amount = res.data.mealCost
        this.discount = res.data.discountCost
        this.mealCategory = res.data.mealCategory
        this.availableDays = res.data.day
        this.tableBody = res.data.vendorDetails.stores
        this.isMealavailable = res.data.availableState
        // this.body = res.data.data
      } catch (error) {
        console.log(error)
      }
    },
  },
  created() {
    // this.getPartners()
    // this.getStream()
    // this.getCoach()
    this.MealDeatil()
    this.getStores()
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
