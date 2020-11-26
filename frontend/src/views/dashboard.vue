<template>
  <div class="dashboard">
    <v-main>
      <v-container
      >
        <top-search-bar @onChangeAccountType="onChangeAccountType"/>
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="12">
              <v-card>
                <v-card-title>Dashboard</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <div v-if="buyer">
                    <v-alert
                    dense
                    border="left"
                    type="warning"
                  >
                    You have new message(s). <a href="#">Click Here</a> to view
                  </v-alert>
                    <v-btn color="purple" dark>Pages views: 22</v-btn>
                    <v-btn color="primary ml-3" dark>Order Pending: 1</v-btn>
                    <h3 class="mt-5">Your recent purchases</h3>
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left text-uppercase font-weight-bold">Customer</th>
                            <th class="text-left text-uppercase font-weight-bold">Order date</th>
                            <th class="text-left text-uppercase font-weight-bold">Dispatch Date</th>
                            <th class="text-left text-uppercase font-weight-bold">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in desserts" :key="item.name">
                            <td>{{ item.name }}</td>
                            <td>{{ item.orderDate }}</td>
                            <td>{{ item.dispatchDate }}</td>
                            <td><span v-if="item.status == 1" class="fa-stack fa-lg"><i class="fa fa-check fa-stack-1x" color="green"></i></span>
                                <span v-else class="fa-stack fa-lg"><i class="fa fa-times fa-stack-1x" color="red"></i></span>
                            </td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                    <hr>
                    <h3 class="mt-5 mb-3">Newly added Sellers</h3>
                    <v-row dense>
                        <v-col
                        v-for="seller in sellers"
                        :key="seller.id"
                        cols="3"
                        >
                        <v-card class="mb-5 mr-2" link @click="shop_page(seller.id)">
                            <v-img
                            :src="seller.logo_url"
                            class="white--text align-end"
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                            height="200px"
                            >
                            </v-img>
                            <v-card-title class="justify-center caption" v-if="seller.state">{{seller.business_name}}<br>{{seller.city}}, {{seller.state}}</v-card-title>
                            <!-- <v-card-actions class="justify-center pt-0 pb-6">
                                <v-btn class="success" :to="{ name: 'SingleSeller', params: { id: seller.id }}"> View </v-btn>
                            </v-card-actions> -->
                        </v-card>
                        </v-col>
                    </v-row>
                  </div>
                   <div v-else-if="seller">
                     <v-alert
                    dense
                    border="left"
                    type="warning"
                  >
                    You have new message(s). <a href="#">Click Here</a> to view
                  </v-alert>
                    <v-btn color="purple" dark>Pages views: 22</v-btn>
                    <v-btn color="primary ml-3" dark>Order Pending: 1</v-btn>
                    <h3 class="mt-5">Your recent Sales</h3>
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left text-uppercase font-weight-bold">Customer</th>
                            <th class="text-left text-uppercase font-weight-bold">Order date</th>
                            <th class="text-left text-uppercase font-weight-bold">Dispatch Date</th>
                            <th class="text-left text-uppercase font-weight-bold">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in desserts" :key="item.name">
                            <td>{{ item.name }}</td>
                            <td>{{ item.orderDate }}</td>
                            <td>{{ item.dispatchDate }}</td>
                            <td><span v-if="item.status == 1" class="fa-stack fa-lg"><i class="fa fa-check fa-stack-1x" color="green"></i></span>
                                <span v-else class="fa-stack fa-lg"><i class="fa fa-times fa-stack-1x" color="red"></i></span>
                            </td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                    <hr>
                    <h3 class="mt-5 mb-3">Newly added Buyers</h3>
                    <v-row dense>
                        <v-col
                        v-for="buyer in buyers"
                        :key="buyer.id"
                        cols="3"
                        >
                        <v-card class="mb-5 mr-2" link>
                            <v-img
                            :src="buyer.logo_url"
                            class="white--text align-end"
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                            height="200px"
                            >
                            </v-img>
                            <v-card-title class="justify-center caption">{{buyer.business_name}}<br>{{buyer.city}}, {{buyer.state}} </v-card-title>
                        </v-card>
                        </v-col>
                    </v-row>
                   </div>
                    <div v-else>
                      <v-card
                        class="mx-auto"
                        max-width="344"
                        outlined
                      >
                        <v-card-actions>
                          <v-btn
                            outlined
                            rounded
                            text
                          >
                            View as Seller
                          </v-btn>
                          <v-btn
                            outlined
                            rounded
                            text
                          >
                            View as Buyer
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </div>
                </v-card-text>
                <v-divider class="mt-12"></v-divider>
                <v-card-actions>
                  <v-btn text>B2B @2020</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn  color="primary" text>Version 1.0.0</v-btn>
                </v-card-actions>
              </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <Footer/>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import TopSearchBar from '@/components/TopSearchBar.vue'

export default {
    name: 'AddProduct',
    components: {
        Footer,
        TopSearchBar
    },
    data () {
        return {
            mobile_number: null,
            logo: null,
            valid:true,
            buyer: false,
            seller:false,
            buyer_seller: false,
            desserts: [
            {
              name: 'Sunil Traders',
              orderDate: '21/01/2020',
              dispatchDate: '25/01/2020',
              status: '1',
            },
            {
              name: 'National Traders',
              orderDate: '21/01/2020',
              dispatchDate: '25/01/2020',
              status: '0',
            }
          ],
          sellers: [],
          buyers: [],
        }
    }, 
    computed: {
        
    },
    methods: {
      shop_page(id) {
        this.$router.push('/my-shop/'+id)
      },
      validate() {
          
      },
      onChangeAccountType() {
        if(localStorage.getItem('user_account') == 'b') {
          this.buyer = true
          this.seller = false
        }
        else if(localStorage.getItem('user_account') == 's') {
          this.seller = true
          this.buyer = false
        }
      },
    },
    created() {
      this.$store.dispatch('getProfile')
          .then((res) => {
          console.log(res.data.data)
          let user = res.data.data
          if(user.user_type == 'b')
            this.buyer = true
          if(user.user_type == 's')
            this.seller = true
          if(user.user_type == 'bs')
            this.buyer_seller = true
          //console.log(localStorage.getItem('user_account'))
          if(user.user_type == 'bs' &&  localStorage.getItem('user_account') == null)
          {
            console.log('hello')
            this.$router.push('/view-as-seller-buyer')
          }
          if(localStorage.getItem('user_account') == 'b') {
            this.buyer = true
          }
          else if(localStorage.getItem('user_account') == 's') {
            this.seller = true
          }
      })
      .catch(err => {
        console.log(err)
      })
      this.$store.dispatch('getSellers')
          .then((res) => {
            this.sellers = res.data.data
          //console.log(res.data.data)

        })
      .catch(err => {
        console.log(err)
      })
      this.$store.dispatch('getBuyers')
          .then((res) => {
            this.buyers = res.data.data
          //console.log(res.data.data)

        })
      .catch(err => {
        console.log(err)
      })
    },
    watch() {

    },
    mounted() {
        //console.log(localStorage.getItem('user_account'))
        
    }
}
</script>

<style>
  .dashboard .v-image__image--cover {
    background-size: 80% !important;
    margin-top: 25px;
  }
  /* If the screen size is 601px wide or more */
  @media screen and (min-width: 601px) {
    .home h2 {
      font-size: 37px;
    }
    .home h5 {
      font-size: 16px;;
    }
  }

  /* If the screen size is 600px wide or less */
  @media screen and (max-width: 600px) {
    .home h2 {
      font-size: 20px;
    }
    .home h5 {
      font-size: 10px;;
    }
  }
</style>
