<template>
  <div class="orders">
    <v-main>
      <v-container
      >
        <top-search-bar/>
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="12">
              <v-card>
                <v-card-title>Manage Orders</v-card-title>
                <v-divider></v-divider>
                <v-card-text class="orders-body">
                  <v-tabs
                    color="deep-purple accent-4"
                  >
                    <v-tab>Pending Orders ({{pending_orders.length}})</v-tab>
                    <v-tab>All Orders</v-tab>
                     <v-tab-item
                    >
                      <v-container fluid>
                        <v-row 
                          v-for="order in pending_orders" 
                          :key="order.id"
                          >
                          <v-col cols="12" md="3">
                            <v-btn id="no-background-hover" :ripple="false" class="mt-15" text :to="{ name: 'SingleProduct', params: { id: order.product.name.replace(' ', '-').toLowerCase() +'-'+order.product.id }}"><v-img :src="order.product.units[0].photos[0].photo_url" width="200"></v-img></v-btn>
                          </v-col>
                          <v-col cols="12" md="3">
                            <v-card-subtitle class="subtitle-2 text-blue font-weight-bold blue--text darken-2 mb-0 pb-0 mt-10">{{order.product.name}}</v-card-subtitle>
                            <v-card-subtitle class="subtitle-2 text-blue font-weight-bold blue--text darken-2 mb-0 pb-0"> Quantity: {{order.quantity}}</v-card-subtitle>
                            <v-card-subtitle class="subtitle-2 text-blue font-weight-bold blue--text darken-2 mb-0 pb-0">Price: <i class="fa fa-inr" aria-hidden="true"></i> &#8377; {{ order.price | formatPrice }} </v-card-subtitle>
                          </v-col>
                          <v-col cols="12" md="3">
                            <v-card-subtitle class="font-weight-black mt-10 mb-0 pb-0">
                              Buyer: {{order.buyer[0].business_name}}
                            </v-card-subtitle>
                            <v-card-subtitle class="font-weight-medium mb-0 pb-0">
                              Order date: {{ order.created_at | formatDate}} <br> Order no. # {{order.id}}
                            </v-card-subtitle>
                            <v-card-subtitle class="font-weight-medium mb-0 pb-0 blue--text">
                              Shipping Address: 
                            </v-card-subtitle>
                             <v-card-subtitle class="pb-0 pt-0">{{order.buyer[0].business_name}}</v-card-subtitle>
                            <v-card-subtitle class="pb-0 pt-0">{{order.buyer[0].business_address}}</v-card-subtitle>
                            <v-card-subtitle class="pb-0 pt-0">{{order.buyer[0].city}} - {{order.buyer[0].zip}}</v-card-subtitle>
                          </v-col>
                            <v-col cols="12" md="3">
                              <ItemShipping v-model="showItemShipping" :order_id="order.id" :seller_id="order.user.id"/>
                              <v-btn
                                block
                                color="primary mt-10"
                                @click.stop="showItemShipping=true"
                              >
                                Item is shipped
                              </v-btn>
                              <v-btn
                                block
                                color="primary mt-10"
                              >
                                item not available
                              </v-btn>

                             <v-btn
                                block
                                color="primary mt-10"
                                :to="{ name: 'Messages', params: { id: order.id }}"
                              >
                                Message ( {{order.messageCount}} )
                              </v-btn>
                          </v-col>
                          <v-divider></v-divider>
                        </v-row>
                      </v-container>
                    </v-tab-item>
                    <v-tab-item
                    >
                      <v-container fluid>
                        <v-row 
                          v-for="order in orders" 
                          :key="order.id"
                          >
                          <v-col cols="12" md="3">
                            <v-img :src="order.product.units[0].photos[0].photo_url" width="200"></v-img>
                          </v-col>
                          <v-col cols="12" md="3">
                            <v-card-subtitle class="subtitle-2 text-blue font-weight-bold blue--text darken-2 mb-0 pb-0 mt-10">{{order.product.name}}</v-card-subtitle>
                            <v-card-subtitle class="subtitle-2 text-blue font-weight-bold blue--text darken-2 mb-0 pb-0"> Quantity: {{order.quantity}}</v-card-subtitle>
                            <v-card-subtitle class="subtitle-2 text-blue font-weight-bold blue--text darken-2 mb-0 pb-0">Price: <i class="fa fa-inr" aria-hidden="true"></i> &#8377; {{ order.price | formatPrice }} </v-card-subtitle>
                          </v-col>
                          <v-col cols="12" md="3">
                            <v-card-subtitle class="font-weight-black mt-10 mb-0 pb-0">
                              Buyer: {{order.buyer[0].business_name}}
                            </v-card-subtitle>
                            <v-card-subtitle class="font-weight-medium mb-0 pb-0">
                              Order date: {{ order.created_at | formatDate}} <br> Order no. # {{order.id}}
                            </v-card-subtitle>
                            <v-card-subtitle class="font-weight-medium mb-0 pb-0 blue--text">
                              Shipping Address: 
                            </v-card-subtitle>
                             <v-card-subtitle class="pb-0 pt-0">{{order.buyer[0].business_name}}</v-card-subtitle>
                            <v-card-subtitle class="pb-0 pt-0">{{order.buyer[0].business_address}}</v-card-subtitle>
                            <v-card-subtitle class="pb-0 pt-0">{{order.buyer[0].city}} - {{order.buyer[0].zip}}</v-card-subtitle>
                          </v-col>
                            <v-col cols="12" md="3">
                              <ItemShipping v-model="showItemShipping" :order_id="order.id" :seller_id="order.user.id"/>
                              <v-btn
                                block
                                color="primary mt-10"
                                @click.stop="showItemShipping=true"
                              >
                                Item is shipped
                              </v-btn>
                              <v-btn
                                block
                                color="primary mt-10"
                              >
                                item not available
                              </v-btn>

                              <v-btn
                                block
                                color="primary mt-10"
                                :to="{ name: 'Messages', params: { id: order.id }}"
                              >
                                Message ( {{order.messageCount}} )
                              </v-btn>
                          </v-col>
                          <v-divider></v-divider>
                        </v-row>
                      </v-container>
                    </v-tab-item>
                  </v-tabs>
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
import ItemShipping from '@/components/ItemShipping.vue'

export default {
    name: 'OrderHistory',
    components: {
        Footer,
        TopSearchBar,
        ItemShipping
    },
    data () {
        return {
          showItemShipping: false,
          pending_orders: [],
          orders: []
        }
    }, 
    computed: {
        
    },
    methods: {
        validate() {
            
        }
    },
    created() {
      this.$store.dispatch('getProfile')
          .then((res) => {
          //console.log(res.data.data)
          let user = res.data.data
          if(user.user_type == 'b')
              this.buyer = true
          //console.log(this.user_type)
      
      })
      .catch(err => {
        console.log(err)
      })

      this.$store.dispatch('getOrdersBySeller')
        .then((res) => {
          this.orders = res.data.data
          console.log(this.orders)
          //console.log(res.data.data[0].product.units[0].photos[0])

        })
      .catch(err => {
        console.log(err)
      })

      this.$store.dispatch('getOrderByStatus')
        .then((res) => {
          this.pending_orders = res.data.data
          //console.log(res.data.data[0].product.units[0].photos[0])

        })
      .catch(err => {
        console.log(err)
      })


    },
    mounted() {
        //console.log(this.logo)
        
    }
}
</script>

<style>
  #no-background-hover::before {
   background-color: transparent !important;
  }
  .orders .v-image__image--cover {
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
