<template>
  <div class="order-history">
    <v-main>
      <v-container
      >
        <top-search-bar/>
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="12">
              <v-card>
                <v-card-title>Order List</v-card-title>
                <v-card-subtitle class="subtitle-2 text-blue font-weight-bold blue--text darken-2"> 
                  All your items will be shifted to the following address
                </v-card-subtitle>
                <v-card-subtitle class="pb-0 pt-0">{{business_address}}</v-card-subtitle>
                <v-card-subtitle class="pb-0 pt-0">{{city}} - {{zip}}</v-card-subtitle>
                <v-card-subtitle class="pt-0">{{state}}</v-card-subtitle>
                <v-divider></v-divider>
                <v-card-text class="order-history-body">
                 <v-row 
                  v-for="order in orders" 
                  :key="order.id"
                  >
                   <v-col cols="12" md="3">
                     <v-btn id="no-background-hover" :ripple="false" class="mt-15" text :to="{ name: 'SingleProduct', params: { id: order.product.name.replace(' ', '-').toLowerCase() +'-'+order.product.id }}">
                        <div v-if="order.product.units[0].photos">
                          <v-img :src="order && order.product.units[0].photos[0] ? order.product.units[0].photos[0].photo_url : null" width="200"></v-img>
                        </div>
                      </v-btn>
                   </v-col>
                   <v-col cols="12" md="3">
                    <v-card-subtitle class="subtitle-2 text-blue font-weight-bold blue--text darken-2 mb-0 pb-0 mt-10">{{order.product.name}}</v-card-subtitle>
                    <v-card-subtitle class="subtitle-2 text-blue font-weight-bold blue--text darken-2 mb-0 pb-0"> Quantity: {{order.quantity}}</v-card-subtitle>
                    <v-card-subtitle class="subtitle-2 text-blue font-weight-bold blue--text darken-2 mb-0 pb-0">Price: <i class="fa fa-inr" aria-hidden="true"></i> &#8377; {{order.price | formatPrice}} </v-card-subtitle>
                   </v-col>
                   <v-col cols="12" md="3">
                     <v-card-subtitle class="font-weight-black mt-10 mb-0 pb-0">
                       Supplier: {{order.seller[0].business_name}}
                    </v-card-subtitle>
                    <v-card-subtitle class="font-weight-medium mb-0 pb-0">
                      Order date: {{ order.created_at | formatDate}}
                    </v-card-subtitle>
                     <v-card-subtitle class="font-weight-medium mb-0 pb-0">
                       Order no. # {{order.id}}
                    </v-card-subtitle>
                   </v-col>
                    <v-col cols="12" md="3">
                      <v-btn
                        block
                        color="error mt-10"
                        @click="deleteOrder(order.id)"
                      >
                        Delete
                      </v-btn>
                      <sendMessage v-model="showSendMessage" message_type="i" :user_type="dialog_user_type" :order_id="dialog_order_id" :seller_id="dialog_seller_id"/>
                      <v-btn
                        block
                        color="success mt-10"
                         @click="showSendMessageDialog($event, order.id, order.seller_id, 's')"
                      >
                        Message 
                      </v-btn>
                      <div class="text-center mt-4">
                        <ChangeShippingAddress v-model="showChangeShippingAddress" :order_id="order.id" @choosedDefaultAddress="choosedDefaultAddress" @updateDefaultAddress="updateDefaultAddress(order.id)"/>
                        <a text class="red--text" @click.stop="showChangeShippingAddress=true" v-if="user_default_address">Change Shipping Address</a>
                        <a text class="blue--text" @click.stop="showChangeShippingAddress=true" v-else>Shipping Address Changed</a>
                      </div>
                   </v-col>
                   <v-divider></v-divider>
                 </v-row>
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
import ChangeShippingAddress from '@/components/ChangeShippingAddress.vue'
import SendMessage from '@/components/SendMessage.vue'

export default {
    name: 'OrderHistory',
    components: {
        Footer,
        TopSearchBar,
        ChangeShippingAddress,
        SendMessage
    },
    data () {
      return {
        dialog_user_type: null,
        dialog_order_id: null,
        dialog_seller_id: null,
        showChangeShippingAddress: false,
        showSendMessage: false,
        orders: [],
        business_address: null,
        city: null,
        zip: null,
        state: null,
        user_default_address:false
      }
    }, 
    computed: {
        
    },
    methods: {
      showSendMessageDialog(e, order_id, seller_id, user_type) {
        this.dialog_user_type = user_type,
        this.dialog_order_id= order_id,
        this.dialog_seller_id = seller_id,
        //console.log(seller_id+user_type+seller_id)
        this.showSendMessage = true
      },
      change_state() {
        //console.log(this.state)
        if(this.state != null)
        {
          this.$store.dispatch('getCities', this.state)
          .then((res) => {
            this.cities = res.data.data
          })
          .catch(err => {
            // console.log(err)
            this.$swal({
                icon: 'error',
                title: 'Oops...',
                text: err,
            });
          })
        }
      },
      updateDefaultAddress(order_id) {
         this.$store.dispatch('getAddressByOrder', order_id)
            .then((res) => {
                console.log('order'+res.data.data[0])
                this.user = res.data.data[0]
                console.log(this.user.default_address)
                this.default_address = this.user.default_address
                this.business_address = this.user.business_address
                this.state = this.user.state
                this.zip = this.user.zip
                this.country = this.user.country
                this.city = this.user.city
            })
            .catch(err => {
                console.log(err)
            }) 
      },
      deleteOrder(id) {
        console.log(id) 
        this.$swal({
          title: 'Are you sure?',
          text: 'Once deleted, you will not be able to recover this order!',
          icon: 'warning',
          showCancelButton: true,
            confirmButtonText: 'Yes Delete it!',
            cancelButtonText: 'No, Keep it!',
            showCloseButton: true,
          }).then((result) => {
            if(result.value) 
            {
              //this.$swal('Deleted', 'You successfully deleted this file', 'success')
              this.$store.dispatch('deleteOrder', id)
                .then((res) => {
                switch (res.data.status) {
                    case 2:
                        this.$swal({
                            icon: 'success',
                            title: 'Congrats',
                            text: 'Order deleted successfully',
                        });
                        var removeIndex = this.orders.map(function(item) { return item.id; }).indexOf(id);
                        this.orders.splice(removeIndex, 1);
                        break;
                    case 4:
                        this.$swal({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Order not found !',
                        });
                        break;
                    case 6:
                        this.$swal({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong !',
                        });
                        break;
                    default:
                    break;
                }
                })
                .catch(err => {
                // console.log(err)
                this.$swal({
                    icon: 'error',
                    title: 'Oops...',
                    text: err,
                });
            })
            } 
            else 
            {
              this.$swal('Cancelled', 'Your Order is still intact', 'info')
            }
          })
       
      },
      choosedDefaultAddress(default_address)
      {
        console.log(default_address)
        this.user_default_address = default_address
        if(default_address == true)
        {
          this.$store.dispatch('getDefaultAddress')
            .then((res) => {
                  console.log(res.data.data)
                  this.user = res.data.data[0]
                  console.log(this.user.default_address)
                  this.default_address = this.user.default_address
                  this.business_address = this.user.business_address
                  this.state = this.user.state
                  this.zip = this.user.zip
                  this.country = this.user.country
                  if(this.state != null)
                      this.change_state();
                  this.city = this.user.city
                  this.user_default_address = true
            })
            .catch(err => {
                console.log(err)
            })
        }
        else
        {
           this.$store.dispatch('getProfile')
              .then((res) => {
              console.log(res.data.data)
              let user = res.data.data
              this.business_address = user.business_address
              this.city = user.city
              this.zip = user.zip
              this.state = user.state
              this.country = user.country
              
              //console.log(this.user_type)
          
          })
          .catch(err => {
              console.log(err)
          })
        }
      }
    },
    created() {
      // this.$store.dispatch('getProfile')
      //     .then((res) => {
      //     console.log(res.data.data)
      //     let user = res.data.data
      //     this.business_address = user.business_address
      //     this.city = user.city
      //     this.zip = user.zip
      //     this.state = user.state
      //     this.business_address_default = user.business_address
      //     this.city_default = user.city
      //     this.zip_default = user.zip
      //     this.state_default = user.state
          
      //     //console.log(this.user_type)
      
      // })
      // .catch(err => {
      //   console.log(err)
      // })
       this.$store.dispatch('getDefaultAddress')
      .then((res) => {
          if(res.data.data.length > 0)
          {
              console.log(res.data.data)
              this.user = res.data.data[0]
              console.log(this.user.default_address)
              this.default_address = this.user.default_address
              this.business_address = this.user.business_address
              this.state = this.user.state
              this.zip = this.user.zip
              this.country = this.user.country
              if(this.state != null)
                  this.change_state();
              this.city = this.user.city
              this.user_default_address = true
          }
          else
          {
              this.$store.dispatch('getProfile')
                  .then((res) => {
                  console.log(res.data.data)
                  let user = res.data.data
                  this.business_address = user.business_address
                  this.city = user.city
                  this.zip = user.zip
                  this.state = user.state
                  this.country = user.country
                  
                  //console.log(this.user_type)
              
              })
              .catch(err => {
                  console.log(err)
              })
          }
      })
      .catch(err => {
          console.log(err)
      })
      this.$store.dispatch('getOrders')
          .then((res) => {
            this.orders = res.data.data
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
  .order-history .v-image__image--cover {
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
