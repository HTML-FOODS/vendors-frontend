<template>
  <div id="bg">
    <v-row class="mt-6" justify="center">
      <v-simple-table class="mt-4">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Customer Name</th>
              <th class="text-left">Customer Phone number</th>
              <th class="text-left">Meal Ordered</th>
              <th class="text-left">Meal Bill</th>
              <th class="text-left">Delivery Fee</th>

              <th class="text-left">Delivery Status</th>

              <th class="text-left">Payment Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in orderDetails" :key="item._id" class="mt-2">
              <td>{{ item.name }}</td>
              <td>{{ item.phonenumber }}</td>
              <td>{{ item.mealName }}</td>
              <td>{{ item.totalCost }}</td>
              <td>{{ item.deliveryCost }}</td>
              <td>{{ item.deliveryStatus }}</td>
              <td>{{ item.paymentStatus }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-row>
    <!-- mobile version -->
  </div>
</template>

<script>
import axios from 'axios'
export default {
  layout: 'storeDashboard',
  data() {
    return {
      switch1: false,
      getVendormeals: [],
      currentState: true,
      storeId: '',
      orderDetails: [],
    }
  },
  methods: {
    async getstoreProfile() {
      try {
        const res = await this.$axios.$get(
          `${this.$config.baseUrl}vendor/store/profile`
        )
        console.log(res.payload[0].storeId)
        this.storeId = res.payload[0].storeId
      } catch (error) {
        console.log(error)
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
        console.log(res)
        this.getVendormeals = res.payload[0].data
        // this.name = res.data.name
      } catch (error) {
        console.log(error)
      }
    },
    async getOrderedMeals() {
      try {
        const storeId = this.$cookies.get('storeId')
        const res = await this.$axios.$get(
          `${this.$config.baseUrl2}checkout/meal/store/search?storeId=${storeId}&ordered?deliveryStatus=pending`
        )
        console.log(res.payload)
        this.orderDetails = res.payload
      } catch (error) {
        console.log(error)
      }
    },
  },
  created() {
    this.getstoreProfile()
    this.getMeals()

    this.getOrderedMeals()
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
