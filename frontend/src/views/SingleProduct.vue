<template>
  <div class="single-product">
    <v-main>
      <v-container
      >
        <top-search-bar :mobile_number="mobile_number" :logo="logo"/>
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="12">
              <v-card>
                <v-card-title>
                  <v-row>
                      <v-col cols="12" sm="5" >
                        <img :src="logo" width="50" alt=""> 
                      </v-col>
                      <v-col cols="12" sm="3">
                        <v-btn v-if="is_buyer" class="float-right mt-2">Order Quantity [{{totalQuantity}}]</v-btn>
                      </v-col>
                      <v-col cols="12" sm="4" class="float-right search-bar">
                         <v-autocomplete
                          :items="product_autocomplete"
                          outlined
                          item-text="name"
                          item-value="id"
                          :placeholder="business_name"
                          @change="searchProduct"
                          icon="false"
                        ></v-autocomplete>
                      </v-col>
                    </v-row>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <div class="single-product-content pa-5">
                      <v-row>
                          <v-col md="6">
                            <VueSlickCarousel
                              ref="c1"
                              :infinite = "images.length"
                              :slidesToShow="1"
                              slidesToScroll: 1,
                              :asNavFor="$refs.c2"
                              :focusOnSelect="true">
                              <div v-for="(image,i) in images"
                                :key="i"><img :src="image.src"></div>
                            </VueSlickCarousel>
                            <VueSlickCarousel
                              ref="c2"
                              :infinite = "thumbnail_images.length"
                              :asNavFor="$refs.c1"
                              :slidesToShow="4"
                              :focusOnSelect="true">
                              <div v-for="(item,j) in thumbnail_images"
                                :key="j"><img :src="item.src"></div>
                            </VueSlickCarousel>
                            </v-col>
                             <v-col md="6">
                                <h2>{{name}}</h2><br>
                                <h4>{{description}}</h4><br>
                                <v-simple-table>
                                    <template v-slot:default>
                                    <thead>
                                        <tr>
                                            <th class="text-left" v-if="is_buyer">Available options</th>
                                            <th v-else>Product</th>
                                            <th class="text-left">Price</th>
                                            <th v-if="!is_buyer">Status</th>
                                            <th class="text-left"  v-if="is_buyer">Order Quantity</th>
                                            <th v-else>In Stock</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="product in products" :key="product.name">
                                            <td width="50%" v-if="is_buyer">{{ product.unit }}
                                                <v-chip
                                                    class="ma-2"
                                                    color="green"
                                                    text-color="white"
                                                    v-if="product.stock > 0"
                                                    >
                                                    Available ({{product.stock}})
                                                </v-chip>
                                                <v-chip
                                                    class="ma-2"
                                                    color="red"
                                                    text-color="white"
                                                    v-else-if="product.stock == 0"
                                                    >
                                                    Not available
                                                    </v-chip>
                                            </td>
                                            <td v-else>{{ product.unit }}</td>
                                            <td width="30%">&#x20B9; {{ product.mrp | formatPrice}}</td>
                                            <th v-if="!is_buyer">
                                               <v-chip
                                                    class="ma-2"
                                                    color="green"
                                                    text-color="white"
                                                    v-if="product.stock > 0"
                                                    >
                                                    Available
                                                </v-chip>
                                                <v-chip
                                                    class="ma-2"
                                                    color="red"
                                                    text-color="white"
                                                    v-else-if="product.stock == 0"
                                                    >
                                                    Not available
                                                    </v-chip>
                                            </th>
                                            <td width="20%" v-if="is_buyer"><v-text-field
                                                outlined
                                                dense
                                                ref="quantity"
                                                v-model="product.quantity"
                                                label="quantity"
                                                placeholder="quantity"
                                                @keyup="checkAvailability"
                                                class="mt-4"
                                            ></v-text-field></td>
                                            <td v-else>
                                              <span v-if="product.stock != null ">{{product.stock}}</span>
                                              <span v-else>NA</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                     <tfoot>
                                        <tr>
                                            <td colspan="3" class="pa-0 ma-0"><v-divider></v-divider></td>
                                        </tr>
                                        <tr v-if="is_buyer">
                                            <th class="text-left"></th>
                                            <th class="text-left">Total Qauntity</th>
                                            <th class="text-left">{{totalQuantity}}</th>
                                        </tr>
                                        <tr v-if="is_buyer">
                                          <td colspan="3" class="text-right" @click="confirmOrder"><v-btn class="success">Confirm Order</v-btn></td>
                                        </tr>
                                    </tfoot>
                                    </template>
                                </v-simple-table>
                            
                            </v-col>
                      </v-row>
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
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
  // optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
    name: 'SingleProduct',
    components: {
        Footer,
        TopSearchBar,
        VueSlickCarousel 
    },
    data () {
        return {
            mobile_number: null,
            logo: null,
            valid:true,
            images: [],
            name: null,
            description: null,
            products: [],
            total: 0,
            order_quantity: 0,
            product_autocomplete: [],
            business_name: null,
            thumbnail_images: [],
            order_details: [],
            product_id: null,
            user_id: null,
            is_buyer: true,
            p_id: null,

        }
    }, 
    computed: {
        totalQuantity()
        {
          let total = 0
          Object.keys(this.products).forEach(key => {
            //if(parseInt(this.products[key].quantity) > 0 && parseInt(this.products[key].available) > parseInt(this.products[key].quantity))
              total = parseInt(total) + parseInt(this.products[key].quantity) // value of the current key

          })
          return total
        }
    },
    methods: {
      checkAvailability()
      {
        Object.keys(this.products).forEach(key => {
          //console.log(this.products[key].stock)
          if(parseInt(this.products[key].stock) < parseInt(this.products[key].quantity))
          {
            this.$swal({
              icon: 'error',
              title: 'Oops...',
              text: 'Order quantity exceeds the available quantity !',
            });
            this.products[key].quantity = 0
          }
        })
      },
      searchProduct(id) 
      {
        console.log(id)
        this.getProductDetails(id)
      },
      getProductDetails(id) {
        this.$store.dispatch('getProduct', id)
        .then((res) => {
            if(res.data.data) {
              console.log(res.data.data)
              this.images = []
              this.products = []
              this.thumbnail_images = []
              this.product_id = res.data.data[0].id,
              this.user_id = res.data.data[0].user_id,
              this.product_category = res.data.data[0].category,
              this.product_sub_category = res.data.data[0].sub_category,
              this.name = res.data.data[0].name,
              this.description = res.data.data[0].description,
              this.tax  = res.data.data[0].tax
              if(res.data.data[0].tax)
                this.tax_input = true 
              for (let i = 0; i < res.data.data[0].photos.length; i++) {
                  this.images.push({
                      src: res.data.data[0].photos[i].big_image
                  }) 
              }
              for (let i = 0; i < res.data.data[0].photos.length; i++) {
                  this.thumbnail_images.push({
                      src: res.data.data[0].photos[i].thumbnail_image
                  }) 
              }
              //console.log(this.images)
              // this.thumbnail_images = res.data.data.thumbnail_image
              // console.log(this.thumbnail_images)
              for (let i = 0; i < res.data.data[0].units.length; i++) {
                this.products.push({
                  unit_id: res.data.data[0].units[i].id,
                  unit: res.data.data[0].units[i].units,
                  code: res.data.data[0].units[i].code,
                  mrp: res.data.data[0].units[i].mrp,
                  rate: res.data.data[0].units[i].rate,
                  moq: res.data.data[0].units[i].moq,
                  available: res.data.data[0].units[i].available,
                  stock: res.data.data[0].units[i].stock,
                  quantity: 0
                })
              }
            }
        })
        .catch(err => {
            console.log(err)
        })
      },
      confirmOrder()
      {
        var error = 0
        //console.log(this.products)
        for(let i = 0; i < this.products.length; i++)
        {
          if(this.products[i].quantity > 0)
          {
            this.order_details.push({
              product_id: this.product_id,
              seller_id: this.user_id,
              product_unit_id: this.products[i].unit_id,
              price: this.products[i].mrp,
              quantity: this.products[i].quantity
            })
          }
          else
          {
            error++
            this.$swal({
              icon: 'error',
              title: 'Oops...',
              text: 'Please enter the order quantity to confirm order !',
            });
          }

        }
        if(error == 0) {
            console.log(error)
            let data =  {
              order_details: this.order_details
            }
            this.$store.dispatch('createOrder', data)
              .then((res) => {
                switch (res.data.status) {
                  case 2:
                    this.valid = false;
                    this.sending = false;
                    this.$swal({
                        icon: 'success',
                        title: 'Congrats',
                        text: 'Order is confirmed',
                    });
                    this.$router.go(-1)
                    //this.$router.push('/list-product') 
                    break;
                  case 3:
                    var error = ''
                    for (const prop in res.data.data) {
                      error += res.data.data[prop]
                    }
                    this.$swal({
                        icon: 'error',
                        title: 'Oops...',
                        text: `${res.data.data.message}`,
                    });
                    break;
                  case 4:
                    this.$swal({
                        icon: 'error',
                        title: 'Oops...',
                        text: `${error}`,
                    });
                    break;
                  default:
                  break;
                }
              })
          }
        console.log(this.order_details)
      }
    },
    created() {
      if(this.$route.params.id) 
      {
        let arr = []
        arr = this.$route.params.id.split('-');
        console.log(arr)
        this.p_id = arr.pop();
        this.getProductDetails(this.p_id)
      }
      
      this.$store.dispatch('getProfile')
          .then((response) => {
          //console.log(res)
          let user = response.data.data
          this.logo = user.logo_url
          this.business_name = `Search in ${user.business_name}`
          if(user.user_type != 'b')
          {
            this.is_buyer = false
          }
          //console.log(this.user_type)
      
      })
      .catch(err => {
        console.log(err)
      })
      this.$store.dispatch('getProducts')
        .then((res_product_list) => {
        this.product_autocomplete = res_product_list.data.data
        //console.log(this.product_autocomplete);
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
  .single-product .search-bar .v-input__icon.v-input__icon--append {
    display: none;
  } 
  .slick-slider:focus {
     outline: none;
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
