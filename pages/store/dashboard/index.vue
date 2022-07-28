<template>
  <div id="bg">
    <div>
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
            <v-card-title class="text-h6">Today"s order</v-card-title>

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

    <!-- mobile version -->
  </div>
</template>

<script>
export default {
  layout: 'storeDashboard',
  data() {
    return {
      getVendormeals: '',
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' },
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%',
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%',
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%',
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%',
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%',
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%',
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%',
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%',
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%',
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%',
        },
      ],
    }
  },
  methods: {
    async getMeals() {
      try {
        const res = await this.$axios.$get(
          `${this.$config.baseUrl}vendor/meals/getmeals/store`
        )
        console.log(res)
        this.getVendormeals = res
        // this.name = res.data.name
      } catch (error) {
        console.log(error.response)
      }
    },
  },
  created() {
    this.getMeals()
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
