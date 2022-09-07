<template>
  <div id="bg">
    <div>
      <v-row>
        <v-col cols="4">
          <v-card color="#C42D32" dark class="mx-auto" width="400">
            <v-card-title class="text-h6">Available meals</v-card-title>

            <v-card-actions>
              <v-btn text> 500</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card color="#C42D32" dark class="mx-auto" width="400">
            <v-card-title class="text-h6">Today's order</v-card-title>

            <v-card-actions>
              <v-btn text> 5008</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card color="#C42D32" dark class="mx-auto" width="400">
            <v-card-title class="text-h6">Pending order</v-card-title>

            <v-card-actions>
              <v-btn text> 508</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <v-row class="mt-4">
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
            <div
              v-for="(items, index) in item.vendorDetails.stores"
              :key="index"
            >
              <v-btn
                text
                rounded
                color=""
                class="text-capitalize"
                x-small
                v-if="items.storeId == storeId"
              >
                {{ items.mealAvailable }}
              </v-btn>
            </div>

            <div
              v-for="(items, index) in item.vendorDetails.stores"
              :key="index"
              class="ml-2"
            >
              <v-btn
                outlined
                rounded
                color="success"
                class="text-capitalize"
                small
                @click="Available(item._id)"
                v-if="
                  items.storeId == storeId &&
                  items.mealAvailable == 'not available'
                "
              >
                turn on availability
              </v-btn>

              <v-btn
                outlined
                rounded
                color="#C42D32"
                class="text-capitalize"
                small
                @click="notAvailable(item._id)"
                v-if="
                  items.storeId == storeId && items.mealAvailable == 'available'
                "
              >
                turn off availablity
              </v-btn>

              <!--   <v-switch
                flat
                :v-model="items.storeId"
                inset
                false-value="NO"
                true-value="YES"
                @change="changeAvailable(item._id)"
                v-if="items.storeId == storeId"
              ></v-switch>  -->
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- mobile version -->
  </div>
</template>

<script>
export default {
  layout: 'storeDashboard',
  data() {
    return {
      switch1: false,
      getVendormeals: '',
      currentState: true,
      storeId: '',
    }
  },
  methods: {
    async getstoreProfile() {
      try {
        const res = await this.$axios.$get(
          `${this.$config.baseUrl}vendor/store/profile`
        )
        // console.log(res.payload[0].data[0].storeId)
        this.storeId = res.payload[0].data[0].storeId
      } catch (error) {
        console.log(error.response)
      }
    },
    async notAvailable(mealId) {
      try {
        const res = await this.$axios.$post(
          `${this.$config.baseUrl}vendor/store/meal/availability`,
          {
            _id: mealId,
            setCondition: 'not available',
          }
        )
        console.log(res)
        location.reload()
      } catch (error) {
        console.log(error.response)
      }
    },
    async Available(mealId) {
      try {
        const res = await this.$axios.$post(
          `${this.$config.baseUrl}vendor/store/meal/availability`,
          {
            _id: mealId,
            setCondition: 'available',
          }
        )
        console.log(res)
        location.reload()
      } catch (error) {
        console.log(error.response)
      }
    },
    async getMeals() {
      try {
        const res = await this.$axios.$get(
          `${this.$config.baseUrl}vendor/meals/getmeals/store`
        )
        console.log(res.payload[0].data)
        this.getVendormeals = res.payload[0].data
        // this.name = res.data.name
      } catch (error) {
        console.log(error.response)
      }
    },
  },
  created() {
    this.getMeals()
    this.getstoreProfile()
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
</style>
