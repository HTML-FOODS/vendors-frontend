<template>
  <div id="bg">
    <div>
      <v-row class="mt-6" justify="center">
        <v-simple-table class="mt-4">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Store Name</th>
                <th class="text-left">Address</th>

                <th class="text-left">Change Username/password</th>
                <th class="text-left">Change Store details</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in tableBody" :key="item.storeId" class="mt-2">
                <td>{{ item.storeName }}</td>
                <td>{{ item.locationAddress }}</td>

                <td>
                  <v-btn
                    text
                    class="text-capitalize"
                    x-small
                    color="green"
                    @click="getStoreId(item.storeId)"
                  >
                    update
                  </v-btn>
                </td>
                <td>
                  <v-btn
                    text
                    class="text-capitalize"
                    x-small
                    color="green"
                    @click="getStoreIdBio(item.storeId)"
                  >
                    update
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-row>
    </div>

    <v-dialog
      transition="dialog-bottom-transition"
      max-width="600"
      v-model="dialogCred"
    >
      <v-card>
        <v-toolbar color="#C42D32" dark>Change store credential</v-toolbar>

        <v-row justify="center" class="mx-8 mt-6">
          <v-col>
            <v-text-field
              outlined
              label="New username"
              v-model="newUsername"
            ></v-text-field>
            <v-text-field
              outlined
              label="New password"
              v-model="newPassword"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-card-actions class="justify-end">
          <v-btn class="text-capitalize" text @click="dialogCred = false"
            >Back</v-btn
          >
          <v-btn
            :loading="loading"
            color="green darken-1"
            text
            @click="updateStoreCred"
            class="text-capitalize"
            >Update</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      transition="dialog-bottom-transition"
      max-width="600"
      v-model="dialogBio"
    >
      <v-card>
        <v-toolbar color="#C42D32" dark>Change store Bio data</v-toolbar>

        <v-row justify="center" class="mx-8 mt-6">
          <v-col>
            <v-text-field
              outlined
              label="Store name"
              v-model="storeName"
            ></v-text-field>
            <v-text-field
              outlined
              label="Phone number"
              v-model="phoneNumber"
            ></v-text-field>
            <v-text-field
              outlined
              label="Store Address"
              v-model="locationAddress"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-card-actions class="justify-end">
          <v-btn class="text-capitalize" text @click="dialogBio = false"
            >Back</v-btn
          >
          <v-btn
            :loading="loading"
            color="green darken-1"
            text
            @click="updateStoreBio"
            class="text-capitalize"
            >Update</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      dialogCred: false,
      dialogBio: false,
      newPassword: '',
      newUsername: '',
      storeId: '',
      loading: false,
      phoneNumber: '',
      storeName: '',
      locationAddress: '',
    }
  },
  methods: {
    getStoreId(id) {
      this.storeId = id
      this.dialogCred = true
    },
    getStoreIdBio(id) {
      this.storeId = id
      this.dialogBio = true
    },
    async updateStoreCred() {
      this.load = true
      try {
        const res = await this.$axios.$put(
          `${this.$config.baseUrl}vendor/updatestorecredentials/${this.storeId}`,
          {
            password: this.newPassword,
            storeUsername: this.newUsername,
          }
        )
        console.log(res)
        this.dialogCred = false
        this.loading = false
      } catch (error) {
        console.log(error.response)
        this.dialogCred = false
        this.loading = false
      }
    },
    async updateStoreBio() {
      this.load = true
      try {
        const res = await this.$axios.$put(
          `${this.$config.baseUrl}vendor/updatestorebio/${this.storeId}`,
          {
            storeName: this.storeName,
            phoneNumber: this.phoneNumber,
            locationAddress: this.locationAddress,
          }
        )
        console.log(res)
        this.dialogBio = false
        this.loading = false
      } catch (error) {
        console.log(error.response)
        this.dialogBio = false
        this.loading = false
      }
    },
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
