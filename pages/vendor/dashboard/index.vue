<template>
  <div id="bg">
    <div>
      <v-row>
        <v-col cols="4">
          <v-card color="#F4740E" dark class="mx-auto" width="400">
            <v-card-title class="text-h6">Available meals</v-card-title>

            <v-card-actions>
              <v-btn text> {{totalAvailableMeal}}</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card color="#F4740E" dark class="mx-auto" width="400">
            <v-card-title class="text-h6">Today's order</v-card-title>

            <v-card-actions>
              <v-btn text> 5008</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card color="#F4740E" dark class="mx-auto" width="400">
            <v-card-title class="text-h6">Pending order</v-card-title>

            <v-card-actions>
              <v-btn text> 508</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mt-6" justify="center">
        <v-simple-table class="mt-4">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Store Name</th>
                <th class="text-left">Address</th>
                <th class="text-left">Phone</th>
                <th class="text-left">Online Status</th>
                <th class="text-left">View store</th>
                <th class="text-left">Action</th>
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
                <td>
                  <v-btn text class="text-capitalize" x-small color="red">
                    deactivate store
                  </v-btn>
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
      totalAvailableMeal:''
    }
  },
  methods: {
    async getStores() {
      try {
        const res = await this.$axios.$get(
          `${this.$config.baseUrl}vendor/getstores`
        )
        console.log(res.payload)
        this.tableBody = res.payload
        // this.name = res.data.name
      } catch (error) {
        console.log(error.response)
      }
    },
    async getStoreProfile() {
      try {
        const res = await this.$axios.$get(
          `${this.$config.baseUrl}vendor/getProfile`
        )
        console.log(res.payload[0].totalAvailableMeal)
        this.totalAvailableMeal = res.payload[0].totalAvailableMeal
        // this.tableBody = res.payload[0].data
        // this.name = res.data.name
      } catch (error) {
        console.log(error.response)
      }
    },
  },
  created() {
    this.getStores()
    this.getStoreProfile()
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
