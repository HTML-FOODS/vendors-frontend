<template>
  <div id="bg">
    <div>
      <v-row>
        <v-col cols="4">
          <v-card color="#F4740E" dark class="mx-auto" width="400">
            <v-card-title class="text-h6 text-capitalize"
              >Total meals
              <v-icon class="ml-4" left> mdi-food </v-icon></v-card-title
            >

            <v-card-actions>
              <v-btn text class="overline"> {{ totalMealsByVendors }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card color="#F4740E" dark class="mx-auto" width="400">
            <v-card-title class="text-h6 text-capitalize"
              >Total meal checkout
              <v-icon class="ml-4" left> mdi-food </v-icon></v-card-title
            >

            <v-card-actions>
              <v-btn text class="overline"> {{ totalMealCheckouts }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card color="#F4740E" dark class="mx-auto" width="400">
            <v-card-title class="text-h6 text-capitalize"
              >Total checkout payment
              <v-icon class="ml-4" left>
                mdi-cash-multiple
              </v-icon></v-card-title
            >

            <v-card-actions>
              <v-btn text class="overline"> {{ totalCheckoutPayments }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-expansion-panels class="mt-1" flat>
        <v-expansion-panel>
          <v-expansion-panel-header class="text-capitalize caption"
            >Click for More analytics
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col cols="6">
                <v-card color="#F4740E" dark class="mx-auto" width="400">
                  <v-card-title class="text-h6 text-capitalize"
                    >Total pending checkout
                    <v-icon class="ml-4" left> mdi-cart </v-icon></v-card-title
                  >

                  <v-card-actions>
                    <v-btn text class="overline">
                      {{ totalPendingCheckouts }}</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card color="#F4740E" dark class="mx-auto" width="400">
                  <v-card-title class="text-h6 text-capitalize"
                    >Total received checkout
                    <v-icon class="ml-4" left> mdi-cart </v-icon></v-card-title
                  >

                  <v-card-actions>
                    <v-btn text class="overline">
                      {{ totalRecievedCheckouts }}</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-row class="mt-6" justify="center">
        <v-simple-table class="mt-4 mb-6">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Store Name</th>
                <th class="text-left">Address</th>
                <th class="text-left">Phone</th>
                <th class="text-left">Online Status</th>
                <th class="text-left">View store</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in tableBody" :key="item.storeId" class="mt-2">
                <td>{{ item.storeName }}</td>
                <td>{{ item.locationAddress }}</td>
                <td>{{ item.phoneNumber }}</td>
                <td>online</td>
                <td>
                  <nuxt-link :to="'/vendor/dashboard/store/' + item.storeId">
                    view store
                  </nuxt-link>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-row>
    </div>

    <!-- mobile version -->
  </div>
</template>

<script>
export default {
  layout: 'vendorDashboard',
  data() {
    return {
      headers: [
        {
          text: 'Store Name',
          align: 'start',
          sortable: false,
          value: 'storeName',
        },
        { text: 'Address', value: 'calories' },
        { text: 'Phone number', value: 'fat' },
        { text: 'Online Status', value: 'fat' },
        { text: 'Action', value: 'carbs' },
      ],
      tableBody: [],
      totalAvailableMeal: '',
      vendorId: '',
      totalMealsByVendors: '',
      totalMealCheckouts: '',
      totalCheckoutPayments: '',
      totalPendingCheckouts: '',
      totalRecievedCheckouts: '',
    }
  },
  methods: {
    async getAnalytics() {
      const token = this.$config.analytics_token
      const config = {
        headers: {
          'x-metric-key': token,
        },
        params: { vendorId: this.vendorId },
      }
      try {
        const analy = await this.$axios.$get(
          `${this.$config.baseUrl2}metrics/vendors`,
          config
        )
        this.totalMealsByVendors = analy.payload.totalMealsByVendors
        this.totalMealCheckouts = analy.payload.totalMealCheckouts
        this.totalCheckoutPayments = analy.payload.totalCheckoutPayments
        this.totalPendingCheckouts = analy.payload.totalPendingCheckouts
        this.totalRecievedCheckouts = analy.payload.totalRecievedCheckouts
      } catch (error) {
        console.log(error)
      }
    },
    async getStores() {
      try {
        const res = await this.$axios.$get(
          `${this.$config.baseUrl}vendor/getstores`
        )

        this.tableBody = res.payload
      } catch (error) {
        console.log(error.response)
      }
    },
    async getStoreProfile() {
      try {
        const res = await this.$axios.$get(
          `${this.$config.baseUrl}vendor/getProfile`
        )
        this.totalAvailableMeal = res.payload[0].totalAvailableMeal
        this.vendorId = res.payload[0].data.vendorId
      } catch (error) {
        console.log(error.response)
      }
    },
  },
  created() {
    this.getStores()
    this.getStoreProfile()
    setTimeout(() => {
      this.getAnalytics()
    }, 1000)
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@500&display=swap');

.xsx {
  margin-top: 20%;
}
.fnt {
  font-family: 'Lato', sans-serif;
}
#sht {
  padding-top: 80px;
}
.rad.v-text-field {
  border-radius: 8px;
  width: 420px;
}

.rad.v-text-field--outlined >>> fieldset {
  border-color: #5465ff;
}

.rad.v-btn {
  border-radius: 6px;
  width: 160px;
}
#bg {
  background: #ffffff;
  height: 100vh;
}

#cent {
  margin-top: 6%;
}

#cent-mb {
  margin-top: 4%;
}
.titl-fnt {
  font-family: 'Urbanist', sans-serif;
  font-size: 52px;
  font-weight: bold;
}

.sub-fnt {
  font-family: 'Urbanist', sans-serif;
  font-size: 22px;
  font-weight: lighter;
}

.titl-fnt-mb {
  font-family: 'Urbanist', sans-serif;
  font-size: 20px;
  font-weight: bold;
}

.sub-fnt-mb {
  font-family: 'Urbanist', sans-serif;
  font-size: 12px;
  font-weight: lighter;
}

.v-data-table {
  width: 100%;
}
</style>
