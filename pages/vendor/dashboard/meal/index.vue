<template>
  <div>
    <v-row>
      <v-col cols="4"> {{ mealMenuTitle }} </v-col>

      <v-col cols="8">
        <v-row justify="end">
          <div>
            <v-chip class="ma-2" color="#C42D32" outlined @click="addMealitemf">
              <v-icon left> mdi-pencil-outline </v-icon>
              Add meal item
            </v-chip>
            <v-chip
              class="ma-2"
              color="#C42D32"
              outlined
              @click="mealsCategory"
            >
              <v-icon left> mdi-pencil-outline </v-icon>
              Add meal category
            </v-chip>
            <v-chip class="ma-2" color="#C42D32" outlined @click="makeCombof">
              <v-icon left> mdi-food </v-icon>
              make a combo
            </v-chip>
          </div>
        </v-row>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-row v-if="mealsMenu">
        <v-col class="mt-4 mx-2">
          <v-card
            class="mx-2 mt-4"
            outlined
            v-for="(item, index) in getVendormeals"
            :key="index"
          >
            <v-list-item three-line>
              <v-list-item-avatar tile size="100" color="grey">
                <v-img :src="item.mealImage"></v-img
              ></v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="text-h5 mb-1">
                  {{ item.mealName }}
                </v-list-item-title>
                <v-list-item-subtitle
                  ><v-chip class="ma-2" label small color="#C42D32" outlined>
                    4 orders
                  </v-chip>
                  <v-chip class="ma-2" label small color="#C42D32" outlined>
                    5 reviews
                  </v-chip></v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>

            <v-card-actions>
              <v-btn
                outlined
                rounded
                color="success"
                class="text-capitalize"
                x-small
              >
                Available
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-if="addMealitem"> add meal item</v-row>
      <v-row v-if="makeCombo">
        <v-col cols="6">
          <v-col>
            <div>Rice</div>
            <div class="pa-4">
              <v-chip-group
                active-class="primary--text"
                column
                v-model="selRice"
              >
                <v-chip v-for="rice in rice" :key="rice">
                  {{ rice }}
                </v-chip>
              </v-chip-group>
            </div>
          </v-col>
          <v-col>
            <div>Protein</div>
            <div class="pa-4">
              <v-chip-group
                active-class="primary--text"
                column
                v-model="selProtein"
              >
                <v-chip v-for="protein in protein" :key="protein">
                  {{ protein }}
                </v-chip>
              </v-chip-group>
            </div>
          </v-col>
          <v-col>
            <div>Drinks</div>
            <div class="pa-4">
              <v-chip-group
                active-class="primary--text"
                column
                v-model="selDrinks"
              >
                <v-chip v-for="drinks in drinks" :key="drinks">
                  {{ drinks }}
                </v-chip>
              </v-chip-group>
            </div>
          </v-col>
          <v-col>
            <div>Sides</div>
            <div class="pa-4">
              <v-chip-group
                active-class="primary--text"
                column
                v-model="selSides"
              >
                <v-chip v-for="sides in sides" :key="sides">
                  {{ sides }}
                </v-chip>
              </v-chip-group>
            </div>
          </v-col>
        </v-col>
        <v-col cols="6" class="mt-5">
          <v-row justify="end">
            <v-col cols="12" sm="7" md="6" lg="5">
              <v-sheet elevation="10" rounded="xl">
                <v-sheet class="pa-2" color="#C42D32" dark rounded="t-xl">
                  <v-btn
                    dark
                    text
                    class="text-capitalize mx-2"
                    @click="prepareComboMeal"
                  >
                    Add meal information
                    <v-icon right>mdi-check-bold</v-icon>
                  </v-btn>
                </v-sheet>

                <div class="pa-2">
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title class="text-bold"
                        >Rice</v-list-item-title
                      >
                      <v-list-item-subtitle>
                        {{ rice[selRice] }}</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                </div>
                <div class="pa-2">
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title class="text-bold"
                        >Drinks</v-list-item-title
                      >
                      <v-list-item-subtitle>
                        {{ drinks[selDrinks] }}</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                </div>
                <div class="pa-2">
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title class="text-bold"
                        >Sides</v-list-item-title
                      >
                      <v-list-item-subtitle>
                        {{ sides[selSides] }}</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                </div>
                <div class="pa-2">
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title class="text-bold"
                        >Protein</v-list-item-title
                      >
                      <v-list-item-subtitle>
                        {{ protein[selProtein] }}</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                </div>
              </v-sheet>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row v-if="addMealcategory"> add meal category </v-row>
    </v-row>

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
        <v-toolbar color="#C42D32" dark>Preview meal</v-toolbar>
        <v-row justify="center" class="mt-6">
          <div class="text-capitalize text-h6 text-bold">{{ combo }}</div>
        </v-row>
        <v-row justify="center" class="mx-8">
          <v-col>
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
            <v-combobox
              v-model="select"
              :items="items"
              label="Available Days"
              multiple
              outlined
            ></v-combobox>
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
            <v-file-input
              v-model="mealImage"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Meal Image"
              prepend-icon="mdi-camera"
              label="Meal image"
            ></v-file-input>
          </v-col>
        </v-row>
        <v-card-actions class="justify-end">
          <v-btn class="text-capitalize" text @click="dialog = false"
            >Back</v-btn
          >
          <v-btn
            :loading="loading"
            color="green darken-1"
            text
            @click="getLink"
            class="text-capitalize"
            >Create meal</v-btn
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
      rice: ['fried rice', 'jollof rice', 'rice and beans'],
      sides: ['salad', 'moi moi'],
      drinks: ['coke', 'power horse', 'five alive', 'fanta'],
      protein: ['Goat meat', 'chciken', 'turkey', 'fish'],
      selRice: '',
      selSides: '',
      selDrinks: '',
      selProtein: '',
      dialog: false,
      select: [],
      items: [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
      ],
      amount: null,
      discount: null,
      imageurl: '',
      getVendormeals: [],
      mealImage: '',
      getImageLink: '',
      storeList: [],
      test: '',
      getSelectedStores: [],
    }
  },
  computed: {},
  methods: {
    tes() {
      console.log(this.test)
      const tt = this.test
      const t = this.$v.delete(this.test, 'lat')
      console.log(t)
    },
    async getLink() {
      const storage = await this.$fireModule.storage()
      const name = this.mealImage.name
      const file = this.mealImage
      const imageRef = storage.ref(`vendors/chickenrep/${name}`)
      const metadata = {
        contentType: file.type,
      }

      const uploadTask = imageRef
        .put(file, metadata)
        .then((snapshot) => {
          // Once the image is uploaded, obtain the download URL, which
          // is the publicly accessible URL of the image.
          return snapshot.ref.getDownloadURL().then((url) => {
            return url
          })
        })
        .catch((error) => {
          console.error('Error uploading image', error)
        })

      uploadTask.then((url) => {
        console.log(url)
        this.getImageLink = url
        this.createComboMeal()
      })
    },
    async getMeals() {
      try {
        const res = await this.$axios.$get(
          `${this.$config.baseUrl}vendor/meals/getmeals`
        )
        console.log(res)
        this.getVendormeals = res
        // this.name = res.data.name
      } catch (error) {
        console.log(error.response)
      }
    },
    async createComboMeal() {
      try {
        const res = await this.$axios.$post(
          `${this.$config.baseUrl}vendor/meals/createmeal`,
          {
            day: this.select,
            mealName: this.combo,
            availableState: true,
            mealCost: this.amount,
            discountCost: this.discount,
            mealImage: this.getImageLink,
            mealCategory: 'majors',
            isMealByVendor: true,
            stores: this.getSelectedStores,
          }
        )
        console.log(res)
        this.loading = false
        this.msg = 'meal created'

        this.snackbar = true
      } catch (error) {
        console.log(error.response)
        this.loading = false
        this.msg = error.response.data.msg
        this.snackbarErr = true
      }
    },
    prepareComboMeal() {
      this.dialog = true
      this.combo =
        this.rice[this.selRice] +
        '+' +
        this.protein[this.selProtein] +
        '+' +
        this.drinks[this.selDrinks] +
        '+' +
        this.sides[this.selSides]
    },
    makeCombof() {
      this.makeCombo = true
      this.mealsMenu = false
      this.addMealitem = false
      this.addMealcategory = false
    },
    mealsCategory() {
      this.makeCombo = false
      this.mealsMenu = false
      this.addMealitem = false
      this.addMealcategory = true
    },
    addMealitemf() {
      this.makeCombo = false
      this.mealsMenu = false
      this.addMealitem = true
      this.addMealcategory = false
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
  },
  created() {
    // this.getPartners()
    // this.getStream()
    // this.getCoach()
    this.getMeals()
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
