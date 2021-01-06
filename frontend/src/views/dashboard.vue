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
                    v-if="newMessageCount"
                  >
                    You have new message(s). <a href="/messages">Click Here</a> to view
                  </v-alert>
                    <v-btn color="purple" dark>Pages views: 22</v-btn>
                    <v-btn color="primary ml-3" dark>Order Pending: {{pending_orders.length}}</v-btn>
                    <h3 class="mt-5">Your recent purchases</h3>
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left text-uppercase font-weight-bold">Sellers</th>
                            <th class="text-left text-uppercase font-weight-bold">Order date</th>
                            <th class="text-left text-uppercase font-weight-bold">Dispatch Date</th>
                            <th class="text-left text-uppercase font-weight-bold">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in orders" :key="item.name">
                            <td>{{ item.seller[0].business_name }}</td>
                            <td>{{ item.created_at | formatDate }}</td>
                            <td>{{ item.dispatched_date | formatDate}}</td>
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
                    v-if="newMessageCount"
                  >
                    You have new message(s). <v-btn text to="/messages" color="primary" >Click here</v-btn> to view
                  </v-alert>
                    <v-btn color="purple" dark>Pages views: 22</v-btn>
                    <v-btn color="primary ml-3" :to="order_pending_link" dark>Order Pending: {{pending_orders.length}}</v-btn>
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
                          <tr v-for="item in orders" :key="item.name">
                            <td>{{ item.user.business_name }}</td>
                            <td>{{ item.created_at | formatDate }}</td>
                            <td>{{ item.dispatched_date | formatDate }}</td>
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
                        <v-card class="mb-5 mr-2" link @click="buyer_details_page(buyer.id)">
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
                        <v-card-text>There is some technical issue issue.</v-card-text>
                        <v-card-actions>
                          <v-btn class="text-center" @click="logout">Please login again</v-btn>
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
          orders: null,
          newMessageCount: null,
          valid:true,
          buyer: false,
          seller:false,
          buyer_seller: false,
          user_type: null,
          sellers: [],
          buyers: [],
          order_pending_link: '/orders',
          pending_orders: null,
        }
    }, 
    computed: {
        
    },
    methods: {
      buyer_details_page(id) {
        this.$router.push('/buyer-details/'+id)
      },
      shop_page(id) {
        this.$router.push('/my-shop/'+id)
      },
      validate() {
          
      },
      onChangeAccountType() {
        if(localStorage.getItem('user_account') == 'b') {
          this.buyer = true
          this.seller = false
          this.order_pending_link = '/my-orders'
        }
        else if(localStorage.getItem('user_account') == 's') {
          this.seller = true
          this.buyer = false
          this.order_pending_link = '/orders'
        }
        this.user_type = localStorage.getItem('user_account')
        this.getMessageCount()
        this.getOrderByUserType()
      },
      getMessageCount()
      {
        this.$store.dispatch('getNewMessagesCount', this.user_type)
        .then((res) => {
            //console.log(res.data.data)
            this.newMessageCount = res.data.data
        
        })
        .catch(err => {
            console.log(err)
        })
      },
      getOrderByUserType()
      {
        this.$store.dispatch('getOrdersByUserType', this.user_type)
            .then((res) => {
              this.orders = res.data.data
              console.log(this.orders)
            })
          .catch(err => {
            console.log(err)
          })
      },
      logout() {
        this.$store.dispatch('logout')
            .then(() => {
            this.$router.push('/')    
            })
            .catch(err => {
                console.log(err)
        })
      },
    },
    created() {
      this.$store.dispatch('getOrdersBySeller')
        .then((res) => {
          this.pending_orders = res.data.data
      })
      .catch(err => {
        console.log(err)
      })
      this.$store.dispatch('getProfile')
          .then((res) => {
          //console.log(res.data.data)
          let user = res.data.data
          this.user_type = user.user_type
          console.log(this.user_type)
          if(localStorage.getItem('user_account') != null)
            this.user_type = localStorage.getItem('user_account')
          if(user.user_type == 'b')
          {
            this.buyer = true
            localStorage.setItem('user_account', 'b')
          }
          if(user.user_type == 's')
          {
            this.seller = true
            localStorage.setItem('user_account', 's')
          }
          if(user.user_type == 'bs')
          {
            this.buyer_seller = true
          }
          //console.log(localStorage.getItem('user_account'))
          if(user.user_type == 'bs' &&  localStorage.getItem('user_account') == null)
          {
            //console.log('hello')
            this.$router.push('/view-as-seller-buyer')
          }
          if(localStorage.getItem('user_account') == 'b') {
            this.buyer = true
          }
          else if(localStorage.getItem('user_account') == 's') {
            this.seller = true
          }
          this.getMessageCount()
          this.getOrderByUserType()
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
