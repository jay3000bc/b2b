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
                            <v-btn id="no-background-hover" :ripple="false" class="mt-15" text :to="{ name: 'SingleProduct', params: { id: order.product.name.replace(' ', '-').toLowerCase() +'-'+order.product.id }}">
                              <div v-if="order.product.units[0].photos">
                                <v-img :src="order && order.product.units[0].photos[0] ? order.product.units[0].photos[0].photo_url : null" width="200"></v-img>
                              </div>
                              <div v-else>
                               <v-img src="@/assets/no-image.png" width="200" alt="no-image"></v-img>
                              </div>
                            </v-btn>
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
                              <ItemShipping @update_orders="update_orders" message_type="o" v-model="showItemShipping" :user_type="dialog_user_type" :order_id="dialog_order_id" :user_id="dialog_user_id"/>
                              <v-btn
                                block
                                color="primary mt-10"
                                @click="showItemShippingDialog($event, order.id, order.user_id, 'b')"
                              >
                                Item is shipped
                              </v-btn>
                              <ItemNotAvailable v-model="showItemNotAvailable"/>
                              <v-btn
                                block
                                color="primary mt-10"
                                @click="showItemNotAvailableDialog($event, order.id, order.user_id, 'b')"
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
                            <div v-if="order.product.units[0].photos[0]">
                              <v-img :src="order && order.product.units[0].photos[0] ? order.product.units[0].photos[0].photo_url : null" width="200"></v-img>
                            </div>
                            <div v-else>
                              <v-img src="@/assets/no-image.png" width="200" alt="no-image"></v-img>
                            </div>
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
                              <ItemShipping @update_orders="update_orders" v-model="showItemShipping" message_type="o" :user_type="dialog_user_type" :order_id="dialog_order_id" :user_id="dialog_user_id"/>
                              <v-btn
                                block
                                color="primary mt-10"
                                @click="showItemShippingDialog($event, order.id, order.user_id, 'b')"
                              >
                                Item is shipped
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
import ItemNotAvailable from '@/components/ItemNotAvailable.vue'

export default {
    name: 'OrderHistory',
    components: {
        Footer,
        TopSearchBar,
        ItemShipping,
        ItemNotAvailable
    },
    data () {
        return {
          showItemShipping: false,
          showItemNotAvailable: false,
          pending_orders: [],
          orders: [],
          dialog_user_type: null,
          dialog_order_id: null,
          dialog_user_id: null,
        }
    }, 
    computed: {
        
    },
    methods: {
      update_orders()
      {
         this.$store.dispatch('getOrdersBySeller')
          .then((res) => {
            
            this.pending_orders = res.data.data
            console.log(this.orders)
            //console.log(res.data.data[0].product.units[0].photos[0])

          })
        .catch(err => {
          console.log(err)
        })

      },
      showItemNotAvailableDialog(e, order_id, user_id, user_type) {
        let data = {
                message_type:'i',
                message: 'item not available',
                buyer_id: user_id,
                order_id: order_id,
                user_type: user_type
            }
            this.$store.dispatch('itemNotAvailable', data)
            .then((res) => {
                switch (res.data.status) {
                    case 2:
                        this.showItemNotAvailable = true
                        break;
                    case 6:
                        this.sending = false;
                        this.$swal({
                            icon: 'error',
                            title: 'Oops...',
                            text: res.data.message,
                        });
                        break;
                    default:
                    break;
                }

                //this.$router.push('/')
            })
            .catch(err => {
                console.log(err)
                this.sending = false;
                this.$swal({
                    icon: 'error',
                    title: 'Oops...',
                    text: err,
                });
            })
            
      },
      validate() {
          
      },
      showItemShippingDialog(e, order_id, user_id, user_type) {
        this.dialog_user_type = user_type,
        this.dialog_order_id= order_id,
        this.dialog_user_id = user_id,
        this.showItemShipping = true
      },
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
          this.pending_orders = res.data.data

        })
      .catch(err => {
        console.log(err)
      })

      this.$store.dispatch('getOrderByStatus')
        .then((res) => {
          this.orders = res.data.data

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
